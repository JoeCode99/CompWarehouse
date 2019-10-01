
    displayCart();

    function displayCart(){
        var cartdata = '<table class="table"><tr><th>Item Name</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>';
        
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cart);
        var total = 0;

        for (var i = 0; i < cart.length; i++) {
            total += cart[i].quantity * cart[i].price;
            cartdata += "<tr><td>" + cart[i].name + "</td>";
            cartdata += "<td>" + cart[i].quantity + "</td>";
            cartdata += "<td>$" + cart[i].price + "</td>";
            cartdata += "<td>$" +  cart[i].quantity * cart[i].price + "</td>";
            cartdata += "<td style='border-bottom: 0px'><button onclick='delElement(" + i + ")'>Remove</button></td></tr>";
        }

        cartdata += '<tr><td></td><td></td><td></td><td>$' + total + '</td></tr></table>'

        document.getElementById('cart').innerHTML = cartdata;

    }

    function delElement(a) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(a, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }