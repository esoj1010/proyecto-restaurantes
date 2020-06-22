<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <%@ include file="/admin/head.jsp" %> 
  <link rel="stylesheet" href="/resources/css/admin.css">
  <title>Categories - TastyTasty</title>
  <script>
    $(window).on('load', () => sessionData.currentPage = "Orders Menu")
  </script>
</head>
<body>
  <%@ include file="/admin/header.jsp" %>
  <%@ include file="/admin/nav.jsp" %>
  <main class="body">
    <div id="app">
      <div class="box">
        <div class="title">Order List</div>
      </div>
      <div class="box">
        <component-bill
          v-for="(bill, key) in bills"
          :object="bills[key]"
          :key="key">
        </component-bill>
      </div>
    </div>
  </main>
</body>
<script src="${pageContext.request.contextPath}/resources/js/admin/orders.js"></script>
</html>
