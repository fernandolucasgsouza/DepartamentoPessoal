export class Irrf{

  static readonly FAIXA_1 = {
    MAX: "1.903,98",
    PERCENT: 0,
    DEDUCAO: 0
  }

  static readonly FAIXA_2 = {
    MIN:'1.903,99',
    MAX: "2.826,65",
    PERCENT: 7.5,
    DEDUCAO: "142,80"
  }

  static readonly FAIXA_3 = {
    MIN:'2.826,66',
    MAX: "3.751,05",
    PERCENT: 15,
    DEDUCAO: "354,80"
  }

  static readonly FAIXA_4 = {
    MIN:'3.751,06',
    MAX: "4.664,68",
    PERCENT: 22.5,
    DEDUCAO: "636,13"
  }

  static readonly FAIXA_5 = {
    ACIMA: "4.664,68",
    PERCENT: 27.5,
    DEDUCAO: "869,36"
  }

  static readonly FAIXA_DEPENDENTE = {
    VALOR: "189,59"
  }

}
