export const wrapWithCurlyBraces = (arg: string) => `{${arg}}`;

export const parseTextWithVariables = (
  text: string,
  variables: Record<string, string>,
) => {
  const variablesKeys = Object.keys(variables);

  variablesKeys.forEach((key) => {
    const variableText = wrapWithCurlyBraces(key);
    if (text.includes(variableText)) {
      text = text.replace(variableText, variables[key]);
    }
  });

  return text;
};
