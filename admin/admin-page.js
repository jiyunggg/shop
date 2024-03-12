document.addEventListener("DOMContentLoaded", function () {
    // 체크할 키와 값을 설정합니다.
    const keyToCheck2 = "allProduct";
    const valueToSet2 = JSON.stringify(productData); // 원하는 값을 설정합니다.

    // 로컬 세션 스토리지에서 키가 이미 존재하는지 확인합니다.
    const hasBeenSet2 = localStorage.getItem(keyToCheck2);
    // 키가 없다면 값을 설정하고 키를 마킹합니다.
    if (!hasBeenSet2) {
        // 원하는 작업을 수행합니다.
        // 여기서는 값 설정을 예시로 들었습니다.
        localStorage.setItem(keyToCheck2, valueToSet2);

        // 설정된 후의 추가 작업을 수행할 수 있습니다.
        console.log("값이 로컬 세션 스토리지에 설정되었습니다.");

        // 만약 한 번만 실행하고 싶은 작업이 있다면 이 부분에 추가로 작성합니다.
        localStorage.setItem('allProduct',JSON.stringify(productData));
        console.log(productData);
    }
});

let allProduct = JSON.parse(localStorage.getItem(('allProduct')));
console.log(allProduct);

const goods_stock = () => {
    // 필수 입력 필드 검사
    var product_name = document.getElementById("product_name").value;
    var stock = document.getElementById("stock").value;
    var price = document.getElementById("price").value;
    var content = document.getElementById("content").value;
    var image = document.getElementById("image").value;

    // 사용자 이름, 이메일, 비밀번호 모두 입력되었는지 확인
    if (product_name.trim() === '' || stock.trim() === '' || price.trim() === '' || content.trim() === '') {
        alert("필수 입력 필드를 작성해주세요.");
        return; // 필수 입력 필드가 비어있을 경우 함수 종료
    }
    else if (product_name.trim() !== '') {
        for (let i = 0; i < allProduct.length; i++) {
            if (allProduct[i].email === product_name) {
                alert("중복된 상품 이름 입니다.");
                return; // 중복된 경우 함수 종료
            }
        }
    }

    // 이후 로직은 유효성 검사를 통과한 경우에만 실행됨
    const newProduct = {
        "id": productData.length + 101,
        "product_name": product_name,
        "stock": stock,
        "price": price,
        "content": content,
        "image": image
    }
    allProduct.push(newProduct);
    localStorage.setItem('allProduct', JSON.stringify(allProduct));
    console.log(allProduct.length);
    alert("재고 추가 완료");
    console.log(allProduct);
    location.href = "../main/index.html";
}