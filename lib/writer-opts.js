"use strict";

const fs = require("fs");
const path = require("path");
const compareFunc = require('compare-func')
const Q = require("q");
const readFile = Q.denodeify(require("fs").readFile);
const resolve = path.resolve;

// 判断配置文件名称
const configName = ".chestnutlogrc";
let defaultOpts = {
  types: [
    {
      type: "feat",
      alias: "Features",
    },
    {
      type: "fix",
      alias: "Bug Fixes",
    },
    {
      type: "perf",
      alias: "Performance Improvements",
    },
    {
      type: "revert",
      alias: "Reverts",
    },
    {
      type: "docs",
      alias: "Documentation",
    },
    {
      type: "style",
      alias: "Styles",
    },
    {
      type: "refactor",
      alias: "Code Refactoring",
    },
    {
      type: "test",
      alias: "Tests",
    },
    {
      type: "build",
      alias: "Build System",
    },
    {
      type: "ci",
      alias: "Continuous Integration",
    },
    {
      type: "chore",
      alias: "Chores",
    },
  ],
  authorName: false,
  authorEmail: true
};
let hasConfigFile = false;

function isBoolean(target) {
  if (Object.prototype.toString.call(target) === '[object Boolean]') {
    return true
  } else {
    console.error(`${target} type is not Boolean`)
    process.exit(1)
  }
}

function getWriterOpts(options) {
  return {
    transform: (commit, context) => {
      let discard = true;
      const issues = [];
      commit.notes.forEach((note) => {
        note.title = "BREAKING CHANGES";
        discard = false;
      });

      const configOpts = options || defaultOpts
      const target = configOpts.types
        .filter((item) => item.type === commit.type)
        .pop();
      if (target) {
        commit.type = target.alias;
      } else if (discard) {
        return;
      }
      
      if (isBoolean(configOpts.authorName) && !configOpts.authorName) {
        delete commit['authorName']
      }

      if (isBoolean(configOpts.authorEmail) && !configOpts.authorEmail) {
        delete commit['authorEmail']
      }

      if (commit.scope === "*") {
        commit.scope = "";
      }

      if (typeof commit.hash === "string") {
        commit.shortHash = commit.hash.substring(0, 7);
      }

      if (typeof commit.subject === "string") {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl;
        if (url) {
          url = `${url}/issues/`;
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue);
            return `[#${issue}](${url}${issue})`;
          });
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(
            /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
            (_, username) => {
              if (username.includes("/")) {
                return `@${username}`;
              }

              return `[@${username}](${context.host}/${username})`;
            }
          );
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter((reference) => {
        if (issues.indexOf(reference.issue) === -1) {
          return true;
        }

        return false;
      });

      return commit;
    },
    groupBy: "type",
    commitGroupsSort: "title",
    commitsSort: ["scope", "subject"],
    noteGroupsSort: "title",
    notesSort: compareFunc,
  };
}

module.exports = Q.all([
  readFile(resolve(__dirname, "./templates/template.hbs"), "utf-8"),
  readFile(resolve(__dirname, "./templates/header.hbs"), "utf-8"),
  readFile(resolve(__dirname, "./templates/commit.hbs"), "utf-8"),
  readFile(resolve(__dirname, "./templates/footer.hbs"), "utf-8"),
]).spread((template, header, commit, footer) => {
  let configData;
  try {
    fs.accessSync(configName, fs.constants.F_OK);
    hasConfigFile = true;
    if (hasConfigFile) {
      const configFile = fs.readFileSync(resolve(__dirname, "..", configName), "utf-8");
      configData = JSON.parse(configFile)
    }
  } catch (error) {
    if (hasConfigFile) {
      console.error(
        `Cannot parse the content of the configuration file to see if it conforms to JSON format`
      );
      process.exit(1)
    }
  }
  const writerOpts = getWriterOpts(configData);
  writerOpts.mainTemplate = template;
  writerOpts.headerPartial = header;
  writerOpts.commitPartial = commit;
  writerOpts.footerPartial = footer;
  return writerOpts;
});
