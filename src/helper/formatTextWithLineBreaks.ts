const formatTextWithLineBreaks = (text: string) => {
  return text ? text?.replace(/\n/g, "<br />") : "";
};
export default formatTextWithLineBreaks;
