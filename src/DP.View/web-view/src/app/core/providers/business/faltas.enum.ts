export enum FaltasEnum {
  /**
   * Até 5 dias de faltas
   * Direito 30 dias férias
   */
  faultsOne = 5,
  vacationDaysOne = 30,

  /**
   * Até 14 dias de faltas
   * Direito 24 dias férias
   */
  faultsTwo = 14,
  vacationDaysTwo = 24,

  /**
   * Até 23 dias de faltas
   * Direito 18 dias férias
   */
  faultsThree = 23,
  vacationDaysThree = 18,

  /**
   * Até 32 dias de faltas
   * Direito 12 dias férias
   */
  faultsFour = 32,
  vacationDaysFour = 12,

  /**
   * Mais que 32 dias de faltas
   * perde o direito de férias
   */
  faultsFive = 33,
  vacationDaysFive = 0,

}
