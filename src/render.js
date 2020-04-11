// ┏━╸╻ ╻┏━╸╻ ╻┏━┓┏━┓ ┏━┓┏━╸┏┓╻╺┳┓┏━╸┏━┓
// ┣╸ ┃ ┃┃  ┣━┫┣━┫┣┳┛ ┣┳┛┣╸ ┃┗┫ ┃┃┣╸ ┣┳┛
// ╹  ┗━┛┗━╸╹ ╹╹ ╹╹┗╸╹╹┗╸┗━╸╹ ╹╺┻┛┗━╸╹┗╸

// Copyright (c) 2020 Shane R. Spencer <spencersr@gmail.com>

/// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// SPDX-License-Identifier: MIT

// Author: Shane R. Spencer <spencersr@gmail.com>

// TODO: Add Comment Block Support
// TODO: Dynamic font height

const detectNewline = require('detect-newline');
const detectIndent = require('detect-indent');

/**
 * Generates a list with the string character by character
 * @param {string} str
 * @returns {string[]}
 */
function strToChars(str) {
  return [...str];
}

/**
 * Render string using future font
 * @todo Add Newline Handling
 * @param {string} font
 * @param {string} text 
 * @returns {string}
 */
function render_string(font, text) {

  var buffer = "";

  let fontData = require(`../fonts/${font}.json`);
  
  var newline = detectNewline(text);
  var indent = detectIndent(text).indent;
  
  if(newline) {
    var lines = text.split(newline);
  } else {
    newline = '\n';
    var lines = [text];
  }

  lines.forEach((line) => {

    var line_0 = indent;
    var line_1 = indent;
    var line_2 = indent;

    strToChars(line.trim()).forEach((c) => {
      let char = fontData[c];
  
      line_0 += char[0];
      line_1 += char[1];
      line_2 += char[2];

    });

    buffer += [line_0, line_1, line_2].join(newline);

  });
  
  return buffer + newline;
}

module.exports = {
  render_string,
};
