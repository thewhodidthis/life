import { assert, report } from "tapeless"
import life from "./main.js"

const { ok } = assert
const { length } = life()()

ok
  .describe(`grid size is ${length}`, "will default")
  .test(length)

report()
