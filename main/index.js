const mainLogo = () => {
    window.location.href = "./index.html";
}

const mini1 = () => {
    document.getElementById("contentFrame").setAttribute("src", "../login/signup-page.html");
}

const mini2 = () => {
    document.getElementById("contentFrame").setAttribute("src", "../login/login-page.html");
}
const cart = () => {
    document.getElementById("contentFrame").setAttribute("src", "../cart/cart.html");
}

// const myPage = () => {
//     // 마이페이지 아직 구현 안됨
// }

// 데이터를 기반으로 상품 폼을 동적으로 생성하는 함수
const generateProductForms = () => {
    const productsContainer = document.querySelector('.products');

    // 각 상품 데이터에 대해 반복하여 상품 폼을 생성
    productData.forEach(product => {
        // 상품을 나타내는 div 요소 생성
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // 상품 이미지 추가
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.product_name;
        productImage.classList.add('product-image');

        // 상품명 추가
        const productName = document.createElement('p');
        productName.classList.add('product_info');
        productName.textContent = product.product_name;

        // 상품 가격 추가
        const productPrice = document.createElement('p');
        productPrice.classList.add('product_info');
        productPrice.textContent = '가격: ' + product.price;

        // 각 요소를 상품 div에 추가
        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);

        // 생성된 상품 div를 상품 목록에 추가
        productsContainer.appendChild(productDiv);
    });
};

// 페이지 로드 시 동적으로 상품 폼 생성
window.onload = generateProductForms;