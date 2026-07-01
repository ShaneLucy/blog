import type { Result } from "axe-core";

export function formatViolations(violations: Result[]): string {
  return violations.map((v) => `[${v.id}] ${v.help}\n  Nodes: ${v.nodes.map((n) => n.html).join("; ")}`).join("\n");
}
