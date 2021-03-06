<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <%@ include file="/head.jsp" %> 
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/user.css">
  <title>Address Book - TastyTasty</title>
  <script>$(window).on('load', () => $('#a-address').addClass('active'))</script>
</head>
<body>
  <%@ include file="/header.jsp" %> 
  <main class="body">
    <div class="main">
      <div id="app">
        <div class="box">
          <h3>Address Book</h3>
        </div>
        <div class="box">
          <div v-if="addresses.length === 0">
            There are no addresses
          </div>
          <list-item v-for="address in addresses" :item="address" :key="address.id" @update="addmodify($event)">
            {{ address.address1 }}
            <br>
            {{ address.address2 }}
            <br>
            {{ address.city }}, {{ address.state }}, {{ address.country }}.
            <br>
            {{ address.postcode }}
          </list-item>
          <button class="button" @click="addmodify()">Add new address</button>
        </div>
        <overlay-box v-model="isOverlayAddShown">
          <template #title>
            <template v-if="id==null">Add a new address</template>
            <template v-else>Update an address</template>
          </template>
            <div class="input-group">
              <input
                type="text"
                v-model.trim="address1"
                placeholder="First line of Address"
                :class="{invalid: !isAddress1Valid}">
            </div>
            <div class="input-group">
              <input
                type="text"
                v-model.trim="address2"
                placeholder="Second line of Address"
                :class="{invalid: !isAddress2Valid}">
            </div>
            <div class="input-group">
              <input
                type="text"
                v-model.trim="city"
                placeholder="City"
                :class="{invalid: !isCityValid}">
              <input
                type="text"
                v-model.trim="state"
                placeholder="State"
                :class="{invalid: !isStateValid}">
              <input
                type="text"
                v-model.trim="postcode"
                placeholder="Postcode"
                :class="{invalid: !isPostcodeValid}">
            </div>
            <div class="input-group">
              <input
                type="text"
                v-model.trim="country"
                placeholder="Country"
                :class="{invalid: !isCountryValid}">
            </div>
          <button class="button" @click="submit" v-bind:disabled="!isValid">
            <template v-if="id==null">Add</template>
            <template v-else>Update</template>
          </button>
        </overlay-box>
      </div>
    </div>
  </main>
  <%@ include file="/footer.jsp" %> 
</body>
<script src="${pageContext.request.contextPath}/resources/js/address.js" defer></script>
</html>
