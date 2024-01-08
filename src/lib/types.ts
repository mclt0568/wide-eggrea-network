export type Optional<T> = T | undefined | null;

// Flex Related
export type MainAxis = "start" | "end" | "center" | "around" | "evenly" | "between";
export type CrossAxis = "start" | "end" | "center" | "stretch";
export type FlexDirection = "row" | "column" | "row-rev" | "column-rev";

// sizing, position and display
export type DisplayMode = "block" | "inline" | "inline-block" | "flex";
export type PositionMode = "absolute" | "relative" | "fixed" | "static" | "sticky";
export type Size = "fit-content" | "auto" | "max-content" | "min-content" | "unset" | string;
export type MatchMode = "match-none" | "match-width" | "match-height" | "match-all";