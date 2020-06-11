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

var data = {
  /*  Aquí van las categorias para los platillos.
   *
   *  ¿Cómo deben ser los objetos internos?
   *    Deben tener mínimo un atributo 'id' y un atributo 'description'.
   *    Se le puede cambiar el nombre a los atributos internos, nada más avisar (ejemplo: si se
   *    quiere 'name' en lugar de 'description').
   */
  categories: [],
  /*  Aquí van los platillos.
   *
   *  ¿Cómo deben ser los objetos internos?
   *    Deben tener mínimo los siguientes atributos:
   *    - id
   *    - name
   *    - description
   *    - price
   *    - category (el id de la categoría a la que pertenecen)
   *
   *  La categoría se puede cambiar cuando se vaya a usar con la base de datos.
   */
  dishes: [],
  /*  Aquí van los platillos que están en el carrito.
   *
   *  Todavía NO está planeado cómo seran, o cómo implementarlo, ahí lo vemos :D
   */
  cart: [],
  /*  Es el id de la categoría que está seleccionada actualmente.
   *  Si es null entonces se muestran todas las categorias.
   */
  selected: null,
  /*  Es el modo de entrega, o sea, si es por envío o la persona viene a recogerlo.
   *  Es un string siempre.
   *  Puede ser "delivery" o "pick-up".
   */
  orderMode: "delivery",
  /*  Es la fecha de entrega que el usuario eligió.
   *  Puede ser "ASAP", en cuyo caso equivaldría a decir la fecha y hora actual.
   *  También puede ser una fecha en formato: yyyy-MM-dd HH:mm e.g. 2020-06-10 22:53.
   */
  time: "ASAP"
};

/* ============================================================================================ 
 * INICIO DE LA PROGRAMACIÓN RELACIONADA CON VUEJS
 * ============================================================================================
 */

/* --> Vue Components <-- */

var dropdown = {
  data: function () {
    return {
      isShown: false
    }
  },
  template: `
    <div class="dropdown">
      <button class="dropdown-trigger button" @click="isShown=!isShown">
        <slot name="trigger"></slot>
        <i class="fas" :class="{'fa-arrow-up': !isShown, 'fa-arrow-down': isShown}"></i>
      </button>
      <div v-show="isShown" class="dropdown-item">
        <slot></slot>
      </div>
    </div>
  `
};

var dropdownInline = {
  data: function () {
    return {
      isShown: true
    }
  },
  template: `
    <div class="dropdown-inline">
      <div class="dropdown-inline-trigger" @click="isShown=!isShown">
        <slot name="trigger"></slot>
        <i class="fas" :class="{'fa-arrow-up': !isShown, 'fa-arrow-down': isShown}"></i>
      </div>
      <div v-show="isShown">
        <slot></slot>
      </div>
    </div>
  `
};

/* --> Vue Instances <-- */

var vmCategories = new Vue({
  el: '#categories',
  data: data
});

var vmOrderMode = new Vue({
  el: '#orderMode',
  data: data,
  computed: {
    isDelivery: function () {
      return this.orderMode == "delivery";
    },
    isPickUp: function () {
      return this.orderMode == "pick-up";
    }
  }
});

var vmTime = new Vue({
  el: '#time',
  data: data,
  components: {
    'dropdown-menu': dropdown
  },
  methods: {
    update() {
      this.time = $('#date-picker').val();
    }
  }
})

var vmDishes = new Vue({
  el: '#dishes',
  data: data,
  components: {
    'dropdown-menu': dropdownInline
  },
  methods: {
    getCategoryById(id) {
      var object = this.categories.find((e) => e.id == id);
      return (object ? object.description : "Invalid Category");
    }
  },
  computed: {
    dishesByCategory: function() {
      if (this.selected !== null) {
        return { [this.selected]: this.dishes.filter((e) => e.category == this.selected) };
      }
      var result = {};
      this.dishes.forEach((e) => {
        if (!result[e.category]) {
					result[e.category] = [];
				}
        result[e.category].push(e);
      });
      return result;
    }
  }
})

/* ============================================================================================ 
 * FIN DE LA PROGRAMACIÓN RELACIONADA CON VUEJS
 * ============================================================================================
 */

/*  NOTA IMPORTANTE
 *
 *  Aquí se hacen las llamadas a la BD al inicio del programa.
 *  Actualmente tienen datos de prueba.
 */

$(window).on('load', async () => {
  data.categories = [
    {id: 0, description: "Appetizer"},
    {id: 1, description: "Main Course"},
    {id: 2, description: "Salads"},
    {id: 3, description: "Seafoods"},
    {id: 4, description: "Traditional"},
    {id: 5, description: "Vegetarian"},
    {id: 6, description: "Soups"},
    {id: 7, description: "Desserts"},
    {id: 8, description: "Drinks"},
    {id: 9, description: "Specials"},
    {id: 10, description: "Rice Dishes"}
  ]
  data.dishes = [
    {id: 0, name: "PUFF-PUFF", description: "Is very tasty", price: '4.99', category: 0},
    {id: 1, name: "Pika Pika", description: "Do not eat pickachu", price: '199.99', category: 0},
    {id: 2, name: "Pika Pika Not", description: "Un rico plato", price: '50.99', category: 1}
  ]
});