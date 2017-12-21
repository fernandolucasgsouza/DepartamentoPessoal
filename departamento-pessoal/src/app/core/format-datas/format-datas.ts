export class FormatDatas {

    /**
    * retorna no formato 32518.03
    * @param val string formato 32.518,03
    */
    static formatForFloat(val: string) {
      let aux;
      let result;

      aux = val.replace(/\./gi, '');
      result = aux.replace(/[\,]/gi, '.');

      return result;
    }
     /**
    * retorna no formato 32518,03
    * @param val string formato 32518.03
    */
    static formatForFloatReverse(val: string) {
      let result;
      result = val.replace(/[\.]/gi, ',');
      return result;
    }

  }
