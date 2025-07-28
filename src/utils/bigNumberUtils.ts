import BigNumber from "bignumber.js";

type InputType = number | string | BigNumber;

// 辅助函数：将输入转换为BigNumber
function convertToBigNumber(value: InputType): BigNumber {
  try {
    // if (value instanceof BigNumber) {
    //   return value;
    // }
    return new BigNumber(value);
  } catch (error) {
    throw new Error(`无法将值${value}转换为有效数字`);
  }
}

// 加法
export function add(...values: InputType[]): BigNumber {
  // 这里很奇怪，提供了初始值acc（BigNumber类型），但是不显式声明，ts则会认为其类型为InputType
  const result = values.reduce(
    (acc: BigNumber, cur) => convertToBigNumber(acc).plus(convertToBigNumber(cur)),
    new BigNumber(0),
  );
  return result;
}

// 减法
export function subtract(a: InputType, b: InputType): BigNumber {
  const num1 = convertToBigNumber(a);
  const num2 = convertToBigNumber(b);
  return num1.minus(num2);
}

// 乘法
export function multiply(...values: InputType[]): BigNumber {
  const result = values.reduce(
    (acc: BigNumber, cur) => convertToBigNumber(acc).multipliedBy(convertToBigNumber(cur)),
    new BigNumber(0),
  );
  return result;
}

// 除法
export function divide(a: InputType, b: InputType): BigNumber {
  const num1 = convertToBigNumber(a);
  const num2 = convertToBigNumber(b);
  if (num2.isZero()) {
    throw new Error("除数不能为零");
  }
  return num1.dividedBy(num2);
}
