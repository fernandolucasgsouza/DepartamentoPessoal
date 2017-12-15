export class FormatDatas{

   /**
   * retorna no formato 32518.03
   * @param val string formato 32.518,03
   */
  static formatForFloat(val: string) {
    let resultOne;
    let resultTwo;
    let resultAux;

    resultAux = val.replace(/\./gi, '-');
    resultOne = resultAux.replace(/[\,]/gi, '.');
    resultTwo = resultOne.replace(/[\-]/gi, ',');

    return resultTwo;
}

}
