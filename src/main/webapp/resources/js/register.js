/*  NOTA IMPORTANTE 
 *  
 *  En la variable global llamada 'data' es donde se guardan los datos de esta página web,
 *  con solo modificarla ya se modifican sus datos.
 *
 *  Ejemplo: 
 *    Para actualizar las categorias basta con hacer `data.categories = [...]` y con eso ya
 *    se renderizan las nuevas categorías.
 *
 *  Adicionalmente, voy a poner una descripción a cada atributo del data para saber qué
 *  hace cada uno y qué utilidad posee.
 *
 *  Pd: Abajo del todo está la función donde se hacen las llamadas a la BD al inicio del
 *  programa.
 */ 

/*  ¡¡NOTA IMPORTANTE!!
 *  
 *  A la hora de hacer login se puede hacer usando data.email y data.password, esos siempre
 *  poseen los datos del usuario.
 */

var data = {
  /*  Esta variable guarda el nombre del usuario.
   */
  firstname: '',
  /*  Esta variable guarda el apellido del usuario.
   */
  lastname: '',
  /*  Esta variable guarda la dirección de email del usuario.
   */
  email: '',
  /*  Esta variable guarda la contraseña del usuario.
   */
  password: '',
  /*  Esta variable contiene la confirmación de la contraseña.
   */
  repassword: '',
  /*  Esta variable contiene el número teléfono.
   */
  cellphone: ''
};

/* ============================================================================================ 
 * INICIO DE LA PROGRAMACIÓN RELACIONADA CON VUEJS
 * ============================================================================================
 */

var vmRegister = new Vue({
  el: '#register',
  data: data,
  computed: {
    isFirstNameValid: function () {
      var conditions = [
        this.firstname.length > 0,
        this.firstname.length <= 45
      ];
      return conditions.every((e) => e);
    },
    isLastNameValid: function () {
      var conditions = [
        this.lastname.length > 0,
        this.lastname.length <= 45
      ];
      return conditions.every((e) => e);
    },
    isEmailValid: function () {
      var conditions = [
        this.email.length > 0,
        this.email.length <= 35
      ];
      return conditions.every((e) => e);
    },
    isPasswordValid: function () {
      var conditions = [
        this.password.length > 0,
        this.password.length <= 64
      ];
      return conditions.every((e) => e);
    },
    isRePasswordValid: function () {
      var conditions = [
        this.repassword.length > 0,
        this.repassword == this.password
      ];
      return conditions.every((e) => e);
    },
    isCellphoneValid: function () {
      var conditions = [
        this.cellphone.length > 0,
        this.cellphone.length <= 8,
        !isNaN(this.cellphone)
      ];
      return conditions.every((e) => e);
    },
    isValid: function() {
      var conditions = [
        this.isFirstNameValid,
        this.isLastNameValid,
        this.isEmailValid,
        this.isPasswordValid,
        this.isRePasswordValid,
        this.isCellphoneValid
      ];
      return conditions.every((e) => e);
    }
  },
  methods: {
    async submit() {
      /*  NOTA IMPORTANTE
       *  
       *  Aquí se coloca el envío a la base de datos y la redirección si la petición es correcta.
       */
      try {
        var user = await register(this.email, this.password, this.firstname, this.lastname, this.cellphone);
        sessionData.user = user;
        window.location.href = `${ctx}/`;
      } catch(ex) {
        console.error(ex);
      }
    }
  }
});

/* ============================================================================================ 
 * FIN DE LA PROGRAMACIÓN RELACIONADA CON VUEJS
 * ============================================================================================
 */

/*  NOTA IMPORTANTE
 *
 *  Aquí se hacen las llamadas a la BD al inicio del programa.
 */

$(window).on('load', async () => {
});
