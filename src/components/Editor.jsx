import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

export default function Editor({ tempNotes, setTempNotes }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={tempNotes}
        onChange={setTempNotes}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={85}
        heightUnits="vh"
      />
    </section>
  );
}
