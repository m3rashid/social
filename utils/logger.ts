import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  // generating basic logging format
  // this returns an object with the data
  // this gets passes to the pino-pretty package to format the output in a readable way
  base: {
    pid: false,
  },
  timestamp: () => `,"time": "${dayjs().format()}"`,
});

export default log;
