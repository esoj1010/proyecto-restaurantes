package app.presentacion.user;

import app.logic.User;
import app.logic.model.UserModel;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.DELETE;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;

@Path("/users")
public class ControllerUser {

  @POST
  @Path("/login")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces({MediaType.APPLICATION_JSON})
  public User getUser(User userData) {
    try {
      User user = UserModel.getInstance().search(userData.getEmail()).get(0);
      if (user == null) {
        throw new Exception("Invalid user");
      } else if (!user.getPassword().equals(userData.getPassword())) {
        throw new Exception("Invalid password");
      }
      return user;
    } catch (Exception ex) {
      System.out.println(ex.getMessage());
      throw new NotFoundException();
    }
  }

  @POST
  @Path("/logout")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces({MediaType.APPLICATION_JSON})
  public void logOut() {
    try {

    } catch (Exception ex) {
      System.out.println(ex.getMessage());
      throw new NotFoundException();
    }
  }

  @POST //CAMBIAR A PUT CUALQUIER VARAX XDXD
  @Path("/register")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces({MediaType.APPLICATION_JSON})
  public User registerUser(User userData) {
    try {

      User exist = UserModel.getInstance().exist(userData.getEmail());
      if (exist != null) {
        throw new NotFoundException();
      } else {
        System.out.print(userData);
        UserModel.getInstance().create(userData);
        return userData;
      }
    } catch (Exception ex) {
      System.out.println(ex.getMessage());
      throw new NotFoundException();
    }
  }
  
  @PUT
  @Path("/update")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces({MediaType.APPLICATION_JSON})
  public User updateUser(User userData) {
    try {

      User exist = UserModel.getInstance().exist(userData.getEmail());
      if (exist != null) {
        
        System.out.print(userData);
        System.out.print("la wea llegga aqui");
        UserModel.getInstance().edit(userData);
        return UserModel.getInstance().exist(userData.getEmail());
        
      } else {
         throw new NotFoundException();
      }
    } catch (Exception ex) {
      return null;
    }
  }
}
