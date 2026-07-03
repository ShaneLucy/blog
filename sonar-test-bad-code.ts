// This file exists solely to trigger SonarQube quality gate failures for testing.
// DELETE THIS FILE before merging to main.

const password = "supersecret123"; // sonar: hardcoded credential
const apiKey = "sk-1234567890abcdef"; // sonar: hardcoded secret
const token = "ghp_abc123def456"; // sonar: hardcoded token

function doStuff(x: any, y: any, z: any): any {
  var result: any = null;
  var unused = "i am never used";
  var alsoUnused = 42;

  if (x == null) {
    // sonar: use === not ==
    result = y;
  } else if (x == undefined) {
    result = z;
  } else if (x == 0) {
    result = x;
  } else if (x == false) {
    result = false;
  } else if (x == "") {
    result = "";
  } else if (x == "0") {
    result = "0";
  } else if (x == null) {
    // duplicate condition — dead branch
    result = null;
  }

  return result;
}

function duplicatedBlock1() {
  const a = 1;
  const b = 2;
  const c = a + b;
  const d = c * 2;
  const e = d - a;
  console.log(a, b, c, d, e);
  return e;
}

function duplicatedBlock2() {
  const a = 1;
  const b = 2;
  const c = a + b;
  const d = c * 2;
  const e = d - a;
  console.log(a, b, c, d, e);
  return e;
}

function duplicatedBlock3() {
  const a = 1;
  const b = 2;
  const c = a + b;
  const d = c * 2;
  const e = d - a;
  console.log(a, b, c, d, e);
  return e;
}

// cognitive complexity explosion
function cognitivelyComplex(a: any, b: any, c: any, d: any, e: any, f: any): any {
  if (a) {
    if (b) {
      if (c) {
        if (d) {
          if (e) {
            if (f) {
              for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                  if (i === j) {
                    while (i > 0) {
                      if (i % 2 === 0) {
                        switch (i) {
                          case 1:
                            return a;
                          case 2:
                            return b;
                          case 3:
                            return c;
                          default:
                            return d;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// empty catch block
async function riskyOperation() {
  try {
    await fetch("http://example.com");
  } catch (e) {
    // swallowed
  }
}

// eval — security hotspot
function runCode(userInput: string) {
  return eval(userInput); // sonar: eval is dangerous
}

// innerHTML XSS risk
function renderHtml(userContent: string) {
  document.getElementById("root")!.innerHTML = userContent; // sonar: XSS
}

// Math.random for security use
function generateToken(): string {
  return Math.random().toString(36).slice(2); // sonar: weak random
}

// unused function export
export function neverCalled(x: number): number {
  return x * x;
}

export { doStuff, cognitivelyComplex, riskyOperation, runCode, renderHtml, generateToken, password, apiKey, token };
