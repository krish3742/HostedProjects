import AccordionItem from "./Accordion";
import UserDetails from "./UserDetails";
import ChangeDetails from "./ChangeDetails";

function MainContent() {
  return (
    <main className="flex-1 px-4 bg-[#e9ecef] ">
      <div className="bg-white">
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem
            title="Workflow timeline"
            className="border-b-2 border-blue-950"
          >
            <p>Timeline content goes here</p>
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="User details">
            <UserDetails />
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="Change details">
            <ChangeDetails />
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="View permissions">
            <p>View permissions form goes here</p>
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="Pending requests">
            <p>Pending requests list goes here</p>
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="Current access">
            <p>Current access information goes here</p>
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="Attachments">
            <p>Attachments list goes here</p>
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="Signatures">
            <p>Signatures section goes here</p>
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="System details">
            <p>System details content goes here</p>
          </AccordionItem>
        </div>
        <div className="border-b-2 border-blue-950 rounded-b-[5px]">
          <AccordionItem title="Options">
            <p>Options and settings go here</p>
          </AccordionItem>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
