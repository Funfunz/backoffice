declare module 'path-match' {
  export interface IMatchParams {
    [key: string]: string,
  };
  export type PathMatch = (url: string) => boolean | { [key:string]: string };
  export type PathMatcher = (url: string) => PathMatch;
  export interface IPathMatcherFactoryArgs {
    sensitive?: boolean;
    strict?: boolean;
    end?: boolean;
  };
  export default function (args?: IPathMatcherFactoryArgs): PathMatcher;
}