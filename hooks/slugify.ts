function slugify(text: string): string {
  const convert: string = text?.toLowerCase().replace(/ /g, "-");
  return convert;
}

export default slugify;
