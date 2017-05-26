import "readable-code"

import gulp from "gulp"
import spawn from "cross-spawn"

export const execSync = spawn.sync

gulp.task("flow:coverage", () => {
  console.log(execSync("flow-coverage-report", [ "-i", "src/**/*.js" ], { stdio: "pipe" }).stdout.toString())
})
