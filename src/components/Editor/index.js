import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const options = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: false,
  showLineNumbers: true,
  tabSize: 2,
};

const Editor = ({ onChange, code }) => {
  return (
      <AceEditor
        width="%100"
        height="1000px"
        mode="c_cpp"
        theme="monokai"
        name="blah2"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        onChange={onChange}
        setOptions={options}
      />
  );
};

export default Editor;
