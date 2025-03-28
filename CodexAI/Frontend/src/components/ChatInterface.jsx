import axios from "axios";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { SendIcon, UserIcon, BotIcon } from "./Icons";
import { useState, useRef, useEffect, memo, useCallback } from "react";

import Loader from "./Loader";

import "../styles/ChatInterface.css";

const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace("language-", "") : "plaintext";

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-container">
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <div className="code-block">{children}</div>
    </div>
  );
};

const MemoizedMarkdown = memo(({ content }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          if (!inline && className) {
            return (
              <CodeBlock className={className}>
                {String(children).trim()}
              </CodeBlock>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
});

const TypingMarkdown = memo(
  ({ text, onTypingComplete }) => {
    const typingRef = useRef(null);
    const fullTextRef = useRef(text);
    const [index, setIndex] = useState(0);
    const isTypingCompleteRef = useRef(false);
    const [typedText, setTypedText] = useState("");

    // Only reset typing when the text prop actually changes
    useEffect(() => {
      if (fullTextRef.current !== text) {
        fullTextRef.current = text;
        isTypingCompleteRef.current = false;
        setIndex(0);
        setTypedText("");
      }
    }, [text]);

    useEffect(() => {
      // Only continue typing if not finished
      if (index < fullTextRef.current.length && !isTypingCompleteRef.current) {
        startTyping();
      } else if (index >= fullTextRef.current.length) {
        isTypingCompleteRef.current = true;
        onTypingComplete && onTypingComplete();
      }

      return () => clearTimeout(typingRef.current);
    }, [index]);

    const startTyping = () => {
      typingRef.current = setTimeout(
        typeNextChar,
        fullTextRef.current.charAt(index) === "\n" ? 500 : 1
      );
    };

    const typeNextChar = () => {
      if (index < fullTextRef.current.length) {
        setTypedText((prev) => prev + fullTextRef.current.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    return (
      <div className="typewriter">
        <MemoizedMarkdown content={typedText} />
      </div>
    );
  },
  // Strict comparison function to prevent unnecessary rerenders
  (prevProps, nextProps) => {
    // Only rerender if the text has actually changed
    return prevProps.text === nextProps.text;
  }
);

const ChatInterface = () => {
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const lastScrollTopRef = useRef(0);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const currentScrollTop = scrollRef.current.scrollTop;
      const isAtBottom =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight <=
        currentScrollTop + 5;

      if (!isAtBottom && currentScrollTop < lastScrollTopRef.current) {
        setIsUserScrolledUp(true);
      } else if (isAtBottom) {
        setIsUserScrolledUp(false);
      }

      lastScrollTopRef.current = currentScrollTop;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (isTyping && !isUserScrolledUp) {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    return () => clearInterval(scrollInterval);
  }, [isTyping, isUserScrolledUp]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [input]);

  const reviewCode = async (code) => {
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}ai/get-review`,
        { code }
      );
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: response.data,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: "Please try again. Error occurred!",
      };
      setMessages((prev) => [...prev, aiResponse]);
    } finally {
      setIsTyping(true);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    setMessages([...messages, userMessage]);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    reviewCode(input);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages-outer-container" ref={scrollRef}>
        <div className="messages-inner-container">
          {messages.length === 0 ? (
            <div className="welcome-container">Hi, How can I help you?</div>
          ) : (
            messages.map((message, index) => (
              <div
                key={message.id}
                className={`message ${
                  message.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                <div className="message-avatar">
                  {message.role === "user" ? <UserIcon /> : <BotIcon />}
                </div>
                {message.role === "user" ? (
                  <div className="user-message-content">{message.content}</div>
                ) : (
                  <div className="ai-message-content">
                    {index === messages.length - 1 ? (
                      <>
                        <TypingMarkdown
                          key={message.id}
                          id={message.id}
                          text={message.content}
                          onTypingComplete={() => setIsTyping(false)}
                        />
                        <div ref={chatContainerRef} />
                      </>
                    ) : (
                      <MemoizedMarkdown content={message.content} />
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="message loading-container">
              <div className="message-avatar">
                <BotIcon />
              </div>
              <Loader />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="input-outer-area">
        <form className="input-inner-area" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="message-input"
            placeholder="Send a message..."
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isTyping) {
                e.preventDefault();
                handleSubmit(e);
              } else if (e.key === "Enter" && isTyping) {
                e.preventDefault();
              }
            }}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!input.trim() || isTyping || isLoading}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
