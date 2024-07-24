export function classes2SassModules(styles: CSSModuleClasses, clazzes: string) {
  if (clazzes == null) return "";
  return clazzes.split(/\s+/).map((clazz) => styles[clazz]).join(" ");
}
