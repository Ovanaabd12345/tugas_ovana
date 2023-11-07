document.addEventListener("DOMContentLoaded", function () {
    const listBarang = document.getElementById("listBarang");
    const formItem = document.getElementById("formItem");
    const keywordInput = document.getElementById("keyword");
    let totalBarangDiKeranjang = 0;

    var items = [
['001', 'Keyboard Logitek', 60000, 'Keyboard yang mantap untuk kantoran', 'logitek.jpg'],
['002', 'Keyboard MSI', 300000, 'Keyboard gaming MSI mekanik', 'msi.jpg'],
['003', 'Mouse Genius', 50000, 'Mouse Genius biar lebih pintar', 'genius.jpeg'],
['004', 'Mouse Jerry', 30000, 'Mouse yang disukai kucing', 'jerry.jpg']
]

    function Cari(keyword) {
        listBarang.innerHTML = "";
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item[1].toLowerCase().includes(keyword.toLowerCase())) {
                const card = document.createElement("div");
                card.classList.add("col-4", "mt-2");
                card.innerHTML = `
                    <div class ="col-4 mt-2"> 
                        <div class="card" style="width: 18rem;">
                            <img src="${item[4]}" class="card-img-top" height="200px" width="200px" alt="...">
                            <div class="card-body">
                                <h5 class="card-title" id="itemName">${item[1]}</h5>
                                <p class="card-text" id="itemDesc">${item[3]}</p>
                                <p class="card-text">Rp ${item[2]}</p>
                                <a href="#" class="btn btn-primary add-to-cart" data-id="${item[0]}">Tambahkan ke keranjang</a>
                            </div>
                        </div>
                    </div>
                `;
                listBarang.appendChild(card);
            }
        }
        const btnTambahKeKeranjang = document.querySelectorAll(".add-to-cart");
        btnTambahKeKeranjang.forEach(button => {
            button.addEventListener("click", tambahKeKeranjang);
        });
    }
    // menangani ketika tombol submit diklik
    formItem.addEventListener("submit", function (e) {
        e.preventDefault();
        const keyword = keywordInput.value;
        Cari(keyword);

    });
    document.getElementById("cart").addEventListener("click", function () {

        if (totalBarangDiKeranjang <= 0) {
            Swal.fire(
                'Info!',
                'Keranjang sudah kosong!',
                'info'
            )
        } else if (totalBarangDiKeranjang > 0 || totalBarangDiKeranjang === `9+`) {
            Swal.fire({
                title: 'Konfirmasi',
                text: "Yakin mau kosongkan keranjang!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Batal!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Berhasil!',
                        'Keranjang berhasil dikosongkan!',
                        'success'
                    )
                    totalBarangDiKeranjang = 0;
                    document.getElementById("cartItemCount").textContent = `(0)`;
                }
            });
        }
    });
    function tambahKeKeranjang(event) {
        const itemId = event.target.getAttribute("data-id");
        // untuk mencari item dari array items yang punya id yg sama dengan itemId
        const item = items.find(item => item[0] === itemId);

        if (totalBarangDiKeranjang < 9) {
            totalBarangDiKeranjang++;
        } else {
            totalBarangDiKeranjang = `9+`;
        }

        document.getElementById("cartItemCount").textContent = `(${totalBarangDiKeranjang})`;
        Swal.fire(
            'Berhasil!',
            `Berhasil menambahkan ${item[1]}!`,
            'success'
        )
    }
    // Menampilkan semua barang saat halaman dimuat
    Cari("");
});