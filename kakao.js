document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.banner-container');
    const slides = document.querySelectorAll('.banner-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pagination = document.querySelectorAll('.banner-pagination span');
    
    let currentSlide = 0;
    
    // 다음 슬라이드로 이동
    function goToSlide(index) {
        container.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        
        // 페이지네이션 업데이트
        pagination.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // 다음 버튼 클릭
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0); // 처음으로 돌아가기
        }
    });
    
    // 이전 버튼 클릭
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(slides.length - 1); // 마지막으로 이동
        }
    });
    
    // 페이지네이션 클릭
    pagination.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // 자동 슬라이드 (5초마다)
    setInterval(() => {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);




    // 콜라보 기획 상품 슬라이드
const collabSection = document.querySelector(".editor-recommendation"); // ✅ 올바른 클래스명
const collabSlidesContainer = collabSection?.querySelector(".slides");
const collabSlides = collabSection?.querySelectorAll(".slides .slide");
const collabPrevBtn = collabSection?.querySelector(".slide-btn.prev"); // ✅ 정확한 클래스 조합
const collabNextBtn = collabSection?.querySelector(".slide-btn.next"); // ✅ 정확한 클래스 조합

if (collabSlidesContainer && collabPrevBtn && collabNextBtn) {
    let currentIndex = 3; // 복제된 첫 번째 요소로 시작
    const slidesToShow = 3;
    const slideWidth = 375;

    const firstSlides = Array.from(collabSlides).slice(0, slidesToShow);
    const lastSlides = Array.from(collabSlides).slice(-slidesToShow);

    firstSlides.forEach(slide => {
        let clone = slide.cloneNode(true);
        collabSlidesContainer.appendChild(clone);
    });

    lastSlides.forEach(slide => {
        let clone = slide.cloneNode(true);
        collabSlidesContainer.insertBefore(clone, collabSlidesContainer.firstChild);
    });

    const totalSlides = collabSection.querySelectorAll(".slides .slide").length;

    collabSlidesContainer.style.transition = "none";
    collabSlidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    function updateCollabSlide(animate = true) {
        collabSlidesContainer.style.transition = animate ? "transform 0.4s ease-in-out" : "none";
        collabSlidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    collabPrevBtn.addEventListener("click", () => {
        currentIndex -= slidesToShow;
        updateCollabSlide();

        if (currentIndex < slidesToShow) {
            setTimeout(() => {
                currentIndex = totalSlides - (slidesToShow * 2);
                updateCollabSlide(false);
            }, 400);
        }
    });

    collabNextBtn.addEventListener("click", () => {
        currentIndex += slidesToShow;
        updateCollabSlide();

        if (currentIndex >= totalSlides - slidesToShow) {
            setTimeout(() => {
                currentIndex = slidesToShow;
                updateCollabSlide(false);
            }, 400);
        }
    });
}


/*신상품/베스트상품*/
const newSlidesContainer = document.querySelector(".new-slides");
const newSlides = document.querySelectorAll(".new-slides .slide");
const newPrevBtn = document.querySelector(".new-prev");
const newNextBtn = document.querySelector(".new-next");

if (newSlidesContainer && newPrevBtn && newNextBtn) {
    let currentNewIndex = 3; // 복제된 첫 번째 요소로 시작
    const slidesToShow = 3;
    const slideWidth = 375; // 350px + 25px(gap)

    // ⭐ 무한 루프를 위해 슬라이드 복제 ⭐
    const firstSlides = Array.from(newSlides).slice(0, slidesToShow); // 앞 3개
    const lastSlides = Array.from(newSlides).slice(-slidesToShow); // 뒤 3개

    firstSlides.forEach(slide => {
        let clone = slide.cloneNode(true);
        newSlidesContainer.appendChild(clone); // 맨 뒤에 추가
    });

    lastSlides.forEach(slide => {
        let clone = slide.cloneNode(true);
        newSlidesContainer.insertBefore(clone, newSlidesContainer.firstChild); // 맨 앞에 추가
    });

    // 슬라이드 개수 재설정 (복제 포함)
    const totalSlides = document.querySelectorAll(".new-slides .slide").length;

    // ⭐ 시작 위치를 복제된 슬라이드에 맞춰 이동 ⭐
    newSlidesContainer.style.transition = "none";
    newSlidesContainer.style.transform = `translateX(-${currentNewIndex * slideWidth}px)`;

    function updateNewSlide(animate = true) {
        if (animate) {
            newSlidesContainer.style.transition = "transform 0.4s ease-in-out";
        } else {
            newSlidesContainer.style.transition = "none"; // 순간 이동
        }
        newSlidesContainer.style.transform = `translateX(-${currentNewIndex * slideWidth}px)`;
    }

    newPrevBtn.addEventListener("click", () => {
        currentNewIndex -= slidesToShow;

        updateNewSlide();

        // ⭐ 애니메이션 후 순간 이동 (첫 번째 그룹일 경우)
        if (currentNewIndex < slidesToShow) {
            setTimeout(() => {
                currentNewIndex = totalSlides - (slidesToShow * 2);
                updateNewSlide(false);
            }, 400); // 애니메이션 시간과 맞춰야 자연스러움
        }
    });

    newNextBtn.addEventListener("click", () => {
        currentNewIndex += slidesToShow;

        updateNewSlide();

        // ⭐ 애니메이션 후 순간 이동 (마지막 그룹일 경우)
        if (currentNewIndex >= totalSlides - slidesToShow) {
            setTimeout(() => {
                currentNewIndex = slidesToShow;
                updateNewSlide(false);
            }, 400);
        }
    });
}

});




const categorySection = document.querySelector(".character-category");

categorySection?.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        const selectedCharacter = button.getAttribute("data-character");
        categorySection.querySelectorAll(".slide").forEach(slide => {
            slide.style.display =
                slide.getAttribute("data-character") === selectedCharacter
                    ? "block"
                    : "none";
        });
    });
});






// 자사 상품
document.addEventListener("DOMContentLoaded", function () {
    const exclusiveSlidesContainer = document.querySelector(".our-slides");
    const exclusiveSlides = document.querySelectorAll(".our-slides .slide");
    const exclusivePrevBtn = document.querySelector(".our-prev");
    const exclusiveNextBtn = document.querySelector(".our-next");

    if (exclusiveSlidesContainer && exclusivePrevBtn && exclusiveNextBtn) {
        let currentExclusiveIndex = 3;
        const slidesToShow = 3;
        const slideWidth = 375;

        // 무한 루프 슬라이드 복제
        const firstSlides = Array.from(exclusiveSlides).slice(0, slidesToShow);
        const lastSlides = Array.from(exclusiveSlides).slice(-slidesToShow);

        firstSlides.forEach(slide => {
            let clone = slide.cloneNode(true);
            exclusiveSlidesContainer.appendChild(clone);
        });

        lastSlides.forEach(slide => {
            let clone = slide.cloneNode(true);
            exclusiveSlidesContainer.insertBefore(clone, exclusiveSlidesContainer.firstChild);
        });

        const totalSlides = document.querySelectorAll(".our-slides .slide").length;

        // 시작 위치 이동
        exclusiveSlidesContainer.style.transition = "none";
        exclusiveSlidesContainer.style.transform = `translateX(-${currentExclusiveIndex * slideWidth}px)`;

        function updateExclusiveSlide(animate = true) {
            if (animate) {
                exclusiveSlidesContainer.style.transition = "transform 0.4s ease-in-out";
            } else {
                exclusiveSlidesContainer.style.transition = "none";
            }
            exclusiveSlidesContainer.style.transform = `translateX(-${currentExclusiveIndex * slideWidth}px)`;
        }

        exclusivePrevBtn.addEventListener("click", () => {
            currentExclusiveIndex -= slidesToShow;
            updateExclusiveSlide();

            if (currentExclusiveIndex < slidesToShow) {
                setTimeout(() => {
                    currentExclusiveIndex = totalSlides - (slidesToShow * 2);
                    updateExclusiveSlide(false);
                }, 400);
            }
        });

        exclusiveNextBtn.addEventListener("click", () => {
            currentExclusiveIndex += slidesToShow;
            updateExclusiveSlide();

            if (currentExclusiveIndex >= totalSlides - slidesToShow) {
                setTimeout(() => {
                    currentExclusiveIndex = slidesToShow;
                    updateExclusiveSlide(false);
                }, 400);
            }
        });
    }
});










//라이언 상품 모아보기 페이지//
// 상품 데이터 (임시용)
// 실제로는 서버에서 받아오거나 fetch()로 불러올 수 있음
const products = Array.from({ length: 100 }, (_, i) => ({
    name: `상품명 ${i + 1}`,
    price: `${(Math.random() * 10000 + 1000).toFixed(0)}원`,
    image: 'https://via.placeholder.com/150', // 임시 이미지
    rating: '★★★★★',
}));

  // DOM 요소 가져오기
const productGrid = document.getElementById('productGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');

  let itemsPerLoad = 20; // 한 번에 보여줄 상품 수
  let currentIndex = 0;  // 현재까지 보여준 상품 인덱스

  // 상품 카드 HTML 생성 함수
function createProductHTML(product) {
    return `
    <div class="product-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
        <p class="title">${product.name}</p>
        <p class="price">${product.price}</p>
        <p class="rating">${product.rating}</p>
        </div>
    </div>
    `;
}

  // 상품 로딩 함수
function loadProducts() {
    const nextProducts = products.slice(currentIndex, currentIndex + itemsPerLoad);
    nextProducts.forEach(product => {
    productGrid.insertAdjacentHTML('beforeend', createProductHTML(product));
    });
    currentIndex += itemsPerLoad;

    // 더 이상 보여줄 상품이 없으면 버튼 숨김
    if (currentIndex >= products.length) {
    loadMoreBtn.style.display = 'none';
    }
}

  // 초기 로딩
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // 첫 20개 로드
    loadMoreBtn.addEventListener('click', loadProducts); // 더보기 버튼 클릭 시 로드
});

















