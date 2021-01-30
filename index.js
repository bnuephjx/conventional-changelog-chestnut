"use strict";
const Q = require("q");
const conventionalChangelog = require("./lib/conventional-changelog");
const parserOpts = require("./lib/parser-opts");
const recommendedBumpOpts = require("./lib/conventional-recommended-bump");
const writerOpts = require("./lib/writer-opts");
const gitRawCommitsOpts = require("./lib/git-raw-commit");

module.exports = Q.all([
  conventionalChangelog,
  parserOpts,
  recommendedBumpOpts,
  writerOpts,
  gitRawCommitsOpts
]).spread(
  (conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts, gitRawCommitsOpts) => {
    return {
      conventionalChangelog,
      parserOpts,
      recommendedBumpOpts,
      writerOpts,
      gitRawCommitsOpts
    };
  }
);
