$("#searchFor").on("keyup", function(){
    
	// Create the Table that will hold the Search Results. Build the Header with column names
	var searchResultsTable = $('<table>');
	//searchResultsTable.append('<thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Description</th><th>Stock</th><th>Quantity</th></tr></thead>');

	var searchForTxt = $(this).val();
	if (searchForTxt == "") {
		$('#view2').empty();
		return;
	}
	
	var database = firebase.database();
	var listOfProducts = database.ref('product');

	var headerAdded = false;
	
	// check to see if Product Category matches the search criteria
	listOfProducts.orderByChild("productCategory").equalTo(searchForTxt).on("child_added", function(snapshot) {
		if ((snapshot.numChildren() > 0) && (!headerAdded)) {
			searchResultsTable.append('<thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Description</th><th>Stock</th><th>Quantity</th></tr></thead>');
			headerAdded = true;
		}
		//snapshot.forEach(function(eachProduct) {
		var productName = snapshot.val().productName;
		var productPrice = snapshot.val().productPrice;
		var productCategory = snapshot.val().productCategory;
		var productDescription = snapshot.val().productDescription;
		var productStock = snapshot.val().productStock;
		var productQuantity = 10;

		searchResultsTable.append('<tbody><tr><th>' + productName + '</th><th>' + productPrice + '</th><th>' + productCategory + 
				'</th><th>' + productDescription + '</th><th>' + productStock + '</th><th>' + productQuantity + '</th></tr></tbody>');
		//});
	});
	
	// check to see if Product Name matches the search criteria. However name is a leading search
	listOfProducts.orderByChild("productName").startAt(searchForTxt).endAt(searchForTxt + "\uf8ff").on("child_added", function(snapshot) {
		if ((snapshot.numChildren() > 0) && (!headerAdded)) {
			searchResultsTable.append('<thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Description</th><th>Stock</th><th>Quantity</th></tr></thead>');
			headerAdded = true;
		}
		//snapshot.forEach(function(eachProduct) {
		var productName = snapshot.val().productName;
		var productPrice = snapshot.val().productPrice;
		var productCategory = snapshot.val().productCategory;
		var productDescription = snapshot.val().productDescription;
		var productStock = snapshot.val().productStock;
		var productQuantity = 10;

		searchResultsTable.append('<tbody><tr><th>' + productName + '</th><th>' + productPrice + '</th><th>' + productCategory + 
				'</th><th>' + productDescription + '</th><th>' + productStock + '</th><th>' + productQuantity + '</th></tr></tbody>');
		//});
	});
	
	// check to see if Product Description matches the search criteria
	listOfProducts.orderByChild("productDescription").startAt(searchForTxt).endAt(searchForTxt + "\uf8ff").on("child_added", function(snapshot) {
		if ((snapshot.numChildren() > 0) && (!headerAdded)) {
			searchResultsTable.append('<thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Description</th><th>Stock</th><th>Quantity</th></tr></thead>');
			headerAdded = true;
		}
		//snapshot.forEach(function(eachProduct) {
		var productName = snapshot.val().productName;
		var productPrice = snapshot.val().productPrice;
		var productCategory = snapshot.val().productCategory;
		var productDescription = snapshot.val().productDescription;
		var productStock = snapshot.val().productStock;
		var productQuantity = 10;

		searchResultsTable.append('<tbody><tr><th>' + productName + '</th><th>' + productPrice + '</th><th>' + productCategory + 
				'</th><th>' + productDescription + '</th><th>' + productStock + '</th><th>' + productQuantity + '</th></tr></tbody>');
		//});
	});
	
	
	$('#view2').empty();
	$('#view2').append(searchResultsTable);
});