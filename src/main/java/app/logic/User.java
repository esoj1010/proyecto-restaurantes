/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.logic;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Mario
 */
@Entity
@Table(name = "user")
@XmlRootElement
@NamedQueries({
  @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
  @NamedQuery(name = "User.findByEmail", query = "SELECT u FROM User u WHERE u.email = :email"),
  @NamedQuery(name = "User.findByPassword", query = "SELECT u FROM User u WHERE u.password = :password"),
  @NamedQuery(name = "User.findByClient", query = "SELECT u FROM User u WHERE u.client = :client"),
  @NamedQuery(name = "User.findByAdministrator", query = "SELECT u FROM User u WHERE u.administrator = :administrator"),
  @NamedQuery(name = "User.findByName", query = "SELECT u FROM User u WHERE u.name = :name"),
  @NamedQuery(name = "User.findByCellphone", query = "SELECT u FROM User u WHERE u.cellphone = :cellphone")})
public class User implements Serializable {

  private static final long serialVersionUID = 1L;
  // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
  @Id
  @Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 35)
  @Column(name = "email")
  private String email;
  @Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 45)
  @Column(name = "password")
  private String password;
  @Basic(optional = false)
  @NotNull
  @Column(name = "client")
  private short client;
  @Basic(optional = false)
  @NotNull
  @Column(name = "administrator")
  private short administrator;
  @Basic(optional = false)
  @NotNull
  @Size(min = 1, max = 45)
  @Column(name = "name")
  private String name;
  @Basic(optional = false)
  @NotNull
  @Column(name = "cellphone")
  private int cellphone;
  @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
  private List<Address> addressList;
  @OneToMany(mappedBy = "userId")
  private List<Bill> billList;

  public User() {
  }

  public User(String email) {
    this.email = email;
  }

  public User(String email, String password, short client, short administrator, String name, int cellphone) {
    this.email = email;
    this.password = password;
    this.client = client;
    this.administrator = administrator;
    this.name = name;
    this.cellphone = cellphone;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public short getClient() {
    return client;
  }

  public void setClient(short client) {
    this.client = client;
  }

  public short getAdministrator() {
    return administrator;
  }

  public void setAdministrator(short administrator) {
    this.administrator = administrator;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getCellphone() {
    return cellphone;
  }

  public void setCellphone(int cellphone) {
    this.cellphone = cellphone;
  }

  @XmlTransient
  public List<Address> getAddressList() {
    return addressList;
  }

  public void setAddressList(List<Address> addressList) {
    this.addressList = addressList;
  }

  @XmlTransient
  public List<Bill> getBillList() {
    return billList;
  }

  public void setBillList(List<Bill> billList) {
    this.billList = billList;
  }

  @Override
  public int hashCode() {
    int hash = 0;
    hash += (email != null ? email.hashCode() : 0);
    return hash;
  }

  @Override
  public boolean equals(Object object) {
    // TODO: Warning - this method won't work in the case the id fields are not set
    if (!(object instanceof User)) {
      return false;
    }
    User other = (User) object;
    if ((this.email == null && other.email != null) || (this.email != null && !this.email.equals(other.email))) {
      return false;
    }
    return true;
  }

  @Override
  public String toString() {
    return "app.logic.User[ email=" + email + " ]";
  }
  
}