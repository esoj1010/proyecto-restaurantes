/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.logic.model;

import app.data.DishDao;

/**
 *
 * @author Mario
 */
public class DishModel extends DishDao {
  
  private DishModel() {
  }
  
  public static DishModel getInstance() {
    return DishModelHolder.INSTANCE;
  }
  
  private static class DishModelHolder {

    private static final DishModel INSTANCE = new DishModel();
  }
}
