
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
            cartdata += "<td>$" + cart[i].price + ".00</td>";
            cartdata += "<td>$" +  cart[i].quantity * cart[i].price + ".00</td>";
            cartdata += "<td style='border-bottom: 0px'><input type='image' onclick='delElement(" + i + ")' src='../img/delete.png' width='25' height='25'></td></tr>";
        }

        cartdata += '<tr><td></td><td></td><td></td><td>$' + total + '.00</td></tr></table>'

        document.getElementById('cart').innerHTML = cartdata;

    }

    function delElement(a) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(a, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function clearCart() {
        var cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function viewShop() {
        window.location.href = "Store.html";
    }

    function checkout() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                var cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart[0] == null) {
                    alert('Cart is empty.');
                } else {
                    window.location.href = "Checkout.html";
                }              
            } else {
                window.location.href = "Login.html";
            }
        });
          
    }