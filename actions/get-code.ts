import axios from "axios";

function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateCode() {
  let CODE_NUM = getRandomNumberBetween(1000, 9999);
  while (true) {
    const res = await axios.get(`/api/v1/${CODE_NUM}`);
    if (res.data.status === 0) {
      CODE_NUM = getRandomNumberBetween(1000, 9999);
    } else if ((res.data.status = 1)) {
      return CODE_NUM;
    }
  }
}

export { generateCode }