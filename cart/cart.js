let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
let cartsData = JSON.parse(localStorage.getItem('cartKey'));
let allProduct = JSON.parse(localStorage.getItem('allProduct'));

// Filter carts for the logged-in user
let userCarts = cartsData.filter(cartItem => cartItem.user_id === loggedInUser.id);

// 새로운 상품을 장바구니에 추가
document.addEventListener("DOMContentLoaded", function () {
    let totalOrderPrice = 0;
    let totalAmount = 0;

    // 주문 테이블을 동적으로 채우는 함수
    function addCartTable(cartTableClass, productName, quantity, price) {
        let table = document.querySelector('.' + cartTableClass);

        let newOrderRow = table.insertRow(table.rows.length);

        let cell1 = newOrderRow.insertCell(0);
        cell1.innerHTML = productName;

        let cell2 = newOrderRow.insertCell(1);
        cell2.innerHTML = quantity + "개";

        let cell3 = newOrderRow.insertCell(2);
        cell3.innerHTML = price + "원";

        totalOrderPrice += price;
        totalAmount += quantity;
    }

    // 주문 상품 테이블에 주문 정보 추가
    for (let i = 0; i < userCarts.length; i++) {
        let cart = userCarts[i];

        // 주문한 제품의 정보 찾기
        let product = allProduct.find(product => product.id === cart.product_id);

        // 할인 기간 내에 있는지 확인
        if (product.start_time && product.end_time) {
            let discountStart = new Date(product.start_time);
            let discountEnd = new Date(product.end_time);
            let currentDate = new Date();

            if (currentDate >= discountStart && currentDate <= discountEnd) {
                // 할인된 가격이 있는 경우에만 해당 가격으로 계산합니다.
                if (product.discount_price !== undefined) {
                    addCartTable("productBox", product.product_name, cart.cart_quantity, product.discount_price * cart.cart_quantity);
                } else {
                    // 할인 가격이 설정되지 않은 경우에는 원래 가격으로 계산합니다.
                    addCartTable("productBox", product.product_name, cart.cart_quantity, product.price * cart.cart_quantity);
                }
            } else {
                // 할인 기간이 지난 경우에는 원래 가격으로 계산합니다.
                addCartTable("productBox", product.product_name, cart.cart_quantity, product.price * cart.cart_quantity);
            }
        } else {
            // 할인 기간이 설정되지 않은 경우에는 원래 가격으로 계산합니다.
            addCartTable("productBox", product.product_name, cart.cart_quantity, product.price * cart.cart_quantity);
        }

        // 로컬 스토리지에 상품 정보 저장
        let cartKey = 'cartKey' + cart.id;
        localStorage.setItem(cartKey, JSON.stringify(product));
    }
    document.getElementById('cart_total_price').textContent = totalOrderPrice + "원";
    document.getElementById('cart_total_amount').textContent = totalAmount + "개";

    // 사용자 주소
    function displayUserAddress() {
        // 배송지 요소에 사용자의 주소를 설정합니다.
        var addressElement = document.querySelector('.userAddress');
        // addressElement.textContent = loggedInUser.address; 초기 코드!!!!!!!!!
        addressElement.innerHTML = "<br>" + loggedInUser.address;
    }

    // 페이지가 로드되면 사용자의 주소를 화면에 표시합니다.
    displayUserAddress();
});
