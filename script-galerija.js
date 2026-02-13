const hamburger = document.getElementById('hamburger');
const navSidebar = document.getElementById('navSidebar');

hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navSidebar.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-sidebar a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navSidebar.classList.remove('active');
    });
});

document.addEventListener('click', function(event) {
    const isClickInsideMenu = navSidebar.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && navSidebar.classList.contains('active')) {
        hamburger.classList.remove('active');
        navSidebar.classList.remove('active');
    }
});

const GALLERY_PASSWORD = 'MilanVoliMionu14.2.2024';
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const errorMsg = document.getElementById('errorMsg');
const passwordLock = document.getElementById('passwordLock');
const galleryWrapper = document.getElementById('galleryWrapper');

window.addEventListener('load', function() {
    if (sessionStorage.getItem('galleryUnlocked') === 'true') {
        unlockGallery();
    }
});

passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (passwordInput.value === GALLERY_PASSWORD) {
        sessionStorage.setItem('galleryUnlocked', 'true');
        unlockGallery();
    } else {
        errorMsg.textContent = 'Greška! Šifra nije ispravna.';
        passwordInput.value = '';
        passwordInput.focus();
    }
});

function unlockGallery() {
    passwordLock.style.display = 'none';
    galleryWrapper.style.display = 'block';
    floatingZoom.style.display = 'flex'; // Prikaži floating zoom controls
    loadPhotos();
}

const photoGallery = document.getElementById('photoGallery');

const cacheSys = {
    cachedPhotos: null,
    cachedTimestamp: 0,
    CACHE_DURATION: 5 * 60 * 1000,
    
    getPhotosData() {
        const now = Date.now();
        if (this.cachedPhotos && (now - this.cachedTimestamp) < this.CACHE_DURATION) {
            return this.cachedPhotos;
        }
        const savedPhotos = JSON.parse(localStorage.getItem('galleryPhotos') || '{}');
        this.cachedPhotos = savedPhotos;
        this.cachedTimestamp = now;
        return savedPhotos;
    },
    
    invalidateCache() {
        this.cachedPhotos = null;
        this.cachedTimestamp = 0;
    }
};

const paginationSettings = {
    currentPage: 1,
    itemsPerPage: 100,
    totalPages: 0,
    allPhotos: []
};

const galleryPhotos = [
    'M&M/1769471575141.jpg',
    'M&M/1769471575152.jpg',
    'M&M/1769471575163.jpg',
    'M&M/1769471575174.jpg',
    'M&M/1769471575193.jpg',
    'M&M/1769471575209.jpg',
    'M&M/1769471575224.jpg',
    'M&M/1769471575239.jpg',
    'M&M/1769471575256.jpg',
    'M&M/1769471575272.jpg',
    'M&M/1769471575286.jpg',
    'M&M/1769471575305.jpg',
    'M&M/1769471575324.jpg',
    'M&M/1769471575339.jpg',
    'M&M/1769471575353.jpg',
    'M&M/1769471575372.jpg',
    'M&M/1769471575388.jpg',
    'M&M/1769471575412.jpg',
    'M&M/1769471575433.jpg',
    'M&M/1769471575450.jpg',
    'M&M/1769471575469.jpg',
    'M&M/1769471575487.jpg',
    'M&M/1769471575512.jpg',
    'M&M/1769471575532.jpg',
    'M&M/1769471575550.jpg',
    'M&M/1769471575570.jpg',
    'M&M/1769471575587.jpg',
    'M&M/1769471575604.jpg',
    'M&M/1769471575619.jpg',
    'M&M/1769471575635.jpg',
    'M&M/1769471575663.jpg',
    'M&M/1769471575682.jpg',
    'M&M/1769471575700.jpg',
    'M&M/1769471575719.jpg',
    'M&M/1769471575736.jpg',
    'M&M/1769471575754.jpg',
    'M&M/1769471575773.jpg',
    'M&M/1769471575791.jpg',
    'M&M/1769471575806.jpg',
    'M&M/1769471575824.jpg',
    'M&M/1769471575839.jpg',
    'M&M/1769471575855.jpg',
    'M&M/1769471575868.jpg',
    'M&M/1769471575885.jpg',
    'M&M/1769471575899.jpg',
    'M&M/1769471575916.jpg',
    'M&M/1769471575944.jpg',
    'M&M/1769471575960.jpg',
    'M&M/1769471575978.jpg',
    'M&M/1769471575993.jpg',
    'M&M/1769471576009.jpg',
    'M&M/1769471576026.jpg',
    'M&M/1769471576040.jpg',
    'M&M/1769471576054.jpg',
    'M&M/1769471576071.jpg',
    'M&M/1769471576088.jpg',
    'M&M/1769471576108.jpg',
    'M&M/1769471576125.jpg',
    'M&M/1769471576140.jpg',
    'M&M/1769471576158.jpg',
    'M&M/1769471576177.jpg',
    'M&M/1769471576195.jpg',
    'M&M/1769471576210.jpg',
    'M&M/1769471576227.jpg',
    'M&M/1769471576243.jpg',
    'M&M/1769471576262.jpg',
    'M&M/1769471576278.jpg',
    'M&M/1769471576296.jpg',
    'M&M/1769471576316.jpg',
    'M&M/1769471576333.jpg',
    'M&M/1769471576348.jpg',
    'M&M/1769471576364.jpg',
    'M&M/1769471576383.jpg',
    'M&M/1769471576401.jpg',
    'M&M/1769471576416.jpg',
    'M&M/1769471576432.jpg',
    'M&M/1769471576447.jpg',
    'M&M/1769471576464.jpg',
    'M&M/1769471576480.jpg',
    'M&M/1769471576495.jpg',
    'M&M/1769471576510.jpg',
    'M&M/1769471576524.jpg',
    'M&M/1769471576541.jpg',
    'M&M/1769471576557.jpg',
    'M&M/1769471576573.jpg',
    'M&M/1769471576586.jpg',
    'M&M/1769471576606.jpg',
    'M&M/1769471576626.jpg',
    'M&M/1769471576647.jpg',
    'M&M/1769471576669.jpg',
    'M&M/1769471576688.jpg',
    'M&M/1769471576707.jpg',
    'M&M/1769471576723.jpg',
    'M&M/1769471576738.jpg',
    'M&M/1769471576754.jpg',
    'M&M/1769471576770.jpg',
    'M&M/1769471576788.jpg',
    'M&M/1769471576803.jpg',
    'M&M/1769471576817.jpg',
    'M&M/1769471576832.jpg',
    'M&M/1769471576849.jpg',
    'M&M/1769471576864.jpg',
    'M&M/1769471576883.jpg',
    'M&M/1769471576901.jpg',
    'M&M/1769471576922.jpg',
    'M&M/1769471576940.jpg',
    'M&M/1769471576956.jpg',
    'M&M/1769471576971.jpg',
    'M&M/1769471576986.jpg',
    'M&M/1769471577000.jpg',
    'M&M/1769471577032.jpg',
    'M&M/1769471577048.jpg',
    'M&M/1769471577061.jpg',
    'M&M/1769471577075.jpg',
    'M&M/1769471577091.jpg',
    'M&M/1769471577122.jpg',
    'M&M/1769471577135.jpg',
    'M&M/1769471577148.jpg',
    'M&M/1769471577164.jpg',
    'M&M/1769471577180.jpg',
    'M&M/1769471577197.jpg',
    'M&M/1769471577214.jpg',
    'M&M/1769471577233.jpg',
    'M&M/1769471577252.jpg',
    'M&M/1769471577270.jpg',
    'M&M/1769471577284.jpg',
    'M&M/1769471577300.jpg',
    'M&M/1769471577316.jpg',
    'M&M/1769471577331.jpg',
    'M&M/1769471577347.jpg',
    'M&M/1769471577362.jpg',
    'M&M/1769471577377.jpg',
    'M&M/1769471577393.jpg',
    'M&M/1769471577408.jpg',
    'M&M/1769471577423.jpg',
    'M&M/1769471577436.jpg',
    'M&M/1769471577451.jpg',
    'M&M/1769471577466.jpg',
    'M&M/1769471577480.jpg',
    'M&M/1769471577496.jpg',
    'M&M/1769471577513.jpg',
    'M&M/1769471577541.jpg',
    'M&M/IMG_20240203_222717.jpg',
    'M&M/IMG_20240203_222725.jpg',
    'M&M/IMG_20240204_003627_988.jpg',
    'M&M/IMG_20240212_221623.jpg',
    'M&M/IMG_20240212_221627.jpg',
    'M&M/IMG_20240227_234329_063.jpg',
    'M&M/IMG_20240227_234727_836.jpg',
    'M&M/IMG_20240227_234746_525.jpg',
    'M&M/IMG_20240408_142547.jpg',
    'M&M/IMG_20240413_152106_165.jpg',
    'M&M/IMG_20240503_015725_160.jpg',
    'M&M/IMG_20240613_191943.jpg',
    'M&M/IMG_20240613_191945.jpg',
    'M&M/IMG_20240613_191946.jpg',
    'M&M/IMG_20240613_192001.jpg',
    'M&M/IMG_20240613_192008.jpg',
    'M&M/IMG_20240613_192021.jpg',
    'M&M/IMG_20240613_192023.jpg',
    'M&M/IMG_20240613_192040.jpg',
    'M&M/IMG_20240613_192052.jpg',
    'M&M/IMG_20240613_192102.jpg',
    'M&M/IMG_20240613_192104.jpg',
    'M&M/IMG_20240613_192110.jpg',
    'M&M/IMG_20240614_211007.jpg',
    'M&M/IMG_20240614_211008.jpg',
    'M&M/IMG_20240614_233207_285.jpg',
    'M&M/IMG_20240614_233210_472.jpg',
    'M&M/IMG_20240619_193314_158.jpg',
    'M&M/IMG_20240619_193314_201.jpg',
    'M&M/IMG_20240619_193314_260.jpg',
    'M&M/IMG_20240620_233156_248.jpg',
    'M&M/IMG_20240621_231103_441.jpg',
    'M&M/IMG_20240621_231104_627.jpg',
    'M&M/IMG_20240825_162030_483.jpg',
    'M&M/IMG_20240825_172517_057.jpg',
    'M&M/IMG_20240825_172517_091.jpg',
    'M&M/IMG_20240825_172517_128.jpg',
    'M&M/IMG_20240825_172517_174.jpg',
    'M&M/IMG_20240825_172517_205.jpg',
    'M&M/IMG_20240825_172517_227.jpg',
    'M&M/IMG_20240825_172517_245.jpg',
    'M&M/IMG_20240825_172517_264.jpg',
    'M&M/IMG_20240825_172517_307.jpg',
    'M&M/IMG_20240825_172517_379.jpg',
    'M&M/IMG_20240827_130514_398.jpg',
    'M&M/IMG_20240828_233044_110.jpg',
    'M&M/IMG_20240828_233048_254.jpg',
    'M&M/IMG_20240830_101616_477.jpg',
    'M&M/IMG_20240830_101626_347.jpg',
    'M&M/IMG_20240830_101638_904.jpg',
    'M&M/IMG_20240830_101641_987.jpg',
    'M&M/IMG_20240830_101646_247.jpg',
    'M&M/IMG_20240830_101650_784.jpg',
    'M&M/IMG_20240830_101654_135.jpg',
    'M&M/IMG_20240830_101656_748.jpg',
    'M&M/IMG_20240830_101709_067.jpg',
    'M&M/IMG_20240830_101712_655.jpg',
    'M&M/IMG_20240830_101735_870.jpg',
    'M&M/IMG_20240902_225541_960.jpg',
    'M&M/IMG_20240908_135333.jpg',
    'M&M/IMG_20240908_135337.jpg',
    'M&M/IMG_20240919_145057_274.jpg',
    'M&M/IMG_20240919_222228_244.jpg',
    'M&M/IMG_20240919_222230_762.jpg',
    'M&M/IMG_20240924_223738_184.jpg',
    'M&M/IMG_20240925_001115_615.jpg',
    'M&M/IMG_20241001_223528_258.jpg',
    'M&M/IMG_20241001_223603_362.jpg',
    'M&M/IMG_20241014_215533_076.jpg',
    'M&M/IMG_20241016_224855_060.jpg',
    'M&M/IMG_20241016_224901_442.jpg',
    'M&M/IMG_20241018_000907_349.jpg',
    'M&M/IMG_20241018_000909_171.jpg',
    'M&M/IMG_20241025_225314_161.jpg',
    'M&M/IMG_20241029_200206.jpg',
    'M&M/IMG_20241029_200209.jpg',
    'M&M/IMG_20241029_200212.jpg',
    'M&M/IMG_20241029_200214.jpg',
    'M&M/IMG_20241029_200250.jpg',
    'M&M/IMG_20241029_200253.jpg',
    'M&M/IMG_20241029_200256.jpg',
    'M&M/IMG_20241029_200258.jpg',
    'M&M/IMG_20241029_200307.jpg',
    'M&M/IMG_20241109_212309.jpg',
    'M&M/IMG_20241109_212323.jpg',
    'M&M/IMG_20241109_212324.jpg',
    'M&M/IMG_20241109_212325.jpg',
    'M&M/IMG_20241109_212329.jpg',
    'M&M/IMG_20241109_212332.jpg',
    'M&M/IMG_20241109_212333.jpg',
    'M&M/IMG_20241109_212334.jpg',
    'M&M/IMG_20241109_212336.jpg',
    'M&M/IMG_20241109_212338.jpg',
    'M&M/IMG_20241109_212340.jpg',
    'M&M/IMG_20241109_212341.jpg',
    'M&M/IMG_20241110_151241_320.jpg',
    'M&M/IMG_20241110_151241_936.jpg',
    'M&M/IMG_20241112_222128_190.jpg',
    'M&M/IMG_20241112_222129_320.jpg',
    'M&M/IMG_20241112_222131_645.jpg',
    'M&M/IMG_20241112_222134_005.jpg',
    'M&M/IMG_20241112_222138_750.jpg',
    'M&M/IMG_20241112_222140_601.jpg',
    'M&M/IMG_20241116_174418.jpg',
    'M&M/IMG_20241116_174624.jpg',
    'M&M/IMG_20241116_174628.jpg',
    'M&M/IMG_20241116_174633.jpg',
    'M&M/IMG_20241116_174636.jpg',
    'M&M/IMG_20241116_174638.jpg',
    'M&M/IMG_20241116_174639.jpg',
    'M&M/IMG_20241204_114401_445.jpg',
    'M&M/IMG_20250103_021515_431.jpg',
    'M&M/IMG_20250103_021516_395.jpg',
    'M&M/IMG_20250103_021517_749.jpg',
    'M&M/IMG_20250106_202607_171.jpg',
    'M&M/IMG_20250106_202607_383.jpg',
    'M&M/IMG_20250106_202607_528.jpg',
    'M&M/IMG_20250106_202607_589.jpg',
    'M&M/IMG_20250106_202607_887.jpg',
    'M&M/IMG_20250106_202613_174.jpg',
    'M&M/IMG_20250106_202613_199.jpg',
    'M&M/IMG_20250106_202613_261.jpg',
    'M&M/IMG_20250106_202613_267.jpg',
    'M&M/IMG_20250106_202613_432.jpg',
    'M&M/IMG_20250106_202613_677.jpg',
    'M&M/IMG_20250106_202613_712.jpg',
    'M&M/IMG_20250106_202613_895.jpg',
    'M&M/IMG_20250108_023913_370.jpg',
    'M&M/IMG_20250126_024348_239.jpg',
    'M&M/IMG_20250126_231429_039.jpg',
    'M&M/IMG_20250131_084146.jpg',
    'M&M/IMG_20250208_165146.jpg',
    'M&M/IMG_20250208_165223.jpg',
    'M&M/IMG_20250208_165225.jpg',
    'M&M/IMG_20250208_165226.jpg',
    'M&M/IMG_20250307_012122_141.jpg',
    'M&M/IMG_20250308_193939_421.jpg',
    'M&M/IMG_20250308_193939_710.jpg',
    'M&M/IMG_20250308_193939_722.jpg',
    'M&M/IMG_20250308_193940_254.jpg',
    'M&M/IMG_20250308_193940_368.jpg',
    'M&M/IMG_20250308_193947_988.jpg',
    'M&M/IMG_20250308_193948_135.jpg',
    'M&M/IMG_20250308_193948_204.jpg',
    'M&M/IMG_20250308_193948_350.jpg',
    'M&M/IMG_20250308_193948_420.jpg',
    'M&M/IMG_20250308_193948_586.jpg',
    'M&M/IMG_20250308_194040_941.jpg',
    'M&M/IMG_20250308_194040_979.jpg',
    'M&M/IMG_20250308_194041_050.jpg',
    'M&M/IMG_20250308_194041_110.jpg',
    'M&M/IMG_20250319_230651_131.jpg',
    'M&M/IMG_20250402_034739_057.jpg',
    'M&M/IMG_20250416_225754.jpg',
    'M&M/IMG_20250416_225756.jpg',
    'M&M/IMG_20250416_225759.jpg',
    'M&M/IMG_20250416_225804.jpg',
    'M&M/IMG_20250416_225806.jpg',
    'M&M/IMG_20250416_225808.jpg',
    'M&M/IMG_20250416_225810.jpg',
    'M&M/IMG_20250416_225813.jpg',
    'M&M/IMG_20250416_225816.jpg',
    'M&M/IMG_20250416_225817.jpg',
    'M&M/IMG_20250416_225818.jpg',
    'M&M/IMG_20250426_144558.jpg',
    'M&M/IMG_20250426_144604.jpg',
    'M&M/IMG_20250426_144608.jpg',
    'M&M/IMG_20250426_144609.jpg',
    'M&M/IMG_20250426_144612.jpg',
    'M&M/IMG_20250426_144618.jpg',
    'M&M/IMG_20250426_144621.jpg',
    'M&M/IMG_20250426_144626.jpg',
    'M&M/IMG_20250426_144628.jpg',
    'M&M/IMG_20250426_144632.jpg',
    'M&M/IMG_20250426_144636.jpg',
    'M&M/IMG_20250426_165130_758.jpg',
    'M&M/IMG_20250426_165131_745.jpg',
    'M&M/IMG_20250426_165132_704.jpg',
    'M&M/IMG_20250427_141433.jpg',
    'M&M/IMG_20250427_141442.jpg',
    'M&M/IMG_20250427_141444.jpg',
    'M&M/IMG_20250427_141507.jpg',
    'M&M/IMG_20250518_180629.jpg',
    'M&M/IMG_20250518_180633.jpg',
    'M&M/IMG_20250518_180655.jpg',
    'M&M/IMG_20250518_180659.jpg',
    'M&M/IMG_20250518_180703.jpg',
    'M&M/IMG_20250518_180707.jpg',
    'M&M/IMG_20250616_000006_403.jpg',
    'M&M/IMG_20250617_200810_277.jpg',
    'M&M/IMG_20250617_200830_026.jpg',
    'M&M/IMG_20251001_234301.jpg',
    'M&M/IMG_20251001_234303.jpg',
    'M&M/IMG_20251001_234304.jpg',
    'M&M/IMG_20251001_234308.jpg',
    'M&M/IMG_20251001_234309.jpg',
    'M&M/IMG_20251001_234310.jpg',
    'M&M/IMG_20251001_234312.jpg',
    'M&M/IMG_20251001_234313.jpg',
    'M&M/IMG-00b32fb24a8d244712707ba51bfbc316-V.jpg',
    'M&M/IMG-00c5a1cd37fbfd01ea348c1a58f6fcfe-V.jpg',
    'M&M/IMG-019e8c8e987aef67e5f601c2bd6cd0fd-V.jpg',
    'M&M/IMG-03585985e5837cb97bda1983561e1683-V.jpg',
    'M&M/IMG-03f2072a02f0ea3a713be03ffe6e4e59-V.jpg',
    'M&M/IMG-03fc03d25f09e427ab629e583df8de55-V.jpg',
    'M&M/IMG-05b4541889180b482af165ca69543002-V.jpg',
    'M&M/IMG-0609815bffbed99dcf7d494274f63d29-V.jpg',
    'M&M/IMG-06c96cb207d3eb030f92ae619e8a7eb7-V.jpg',
    'M&M/IMG-06d0ad2feff24d0d6b68f26260f25b2a-V.jpg',
    'M&M/IMG-071cc1d48521c27a082abcb60d323013-V.jpg',
    'M&M/IMG-0827e4a2c21b2f79f8e02a7c9e106732-V.jpg',
    'M&M/IMG-0934d35a120ef0b7c6a625df1287dad8-V.jpg',
    'M&M/IMG-09a1b9921762bc293afefc8b126d2132-V.jpg',
    'M&M/IMG-0a2db3e2415021c5d6c786af7e7718af-V.jpg',
    'M&M/IMG-0a309681739758d8d4687c0f973f5939-V.jpg',
    'M&M/IMG-0abce58ab561fc95ab4ea71b9c8507c4-V.jpg',
    'M&M/IMG-0d7bf95599cad4feefa47d868d250d13-V.jpg',
    'M&M/IMG-0dcc05d85e4869595dfb82852c99dab9-V.jpg',
    'M&M/IMG-0e0e1afe2bfe6eaa6ef5dadd66e893ac-V.jpg',
    'M&M/IMG-0ea48391fe2f240ae2eb20c567da25fa-V.jpg',
    'M&M/IMG-0ecda19d8c905b12177c9f7236986b36-V.jpg',
    'M&M/IMG-0ee91a905fd348ec7e0cc9858e482fcb-V.jpg',
    'M&M/IMG-0f0b2d6f40e628d2fea97c7d34689dd3-V.jpg',
    'M&M/IMG-0f4ad0202df711b184ad9895f244decd-V.jpg',
    'M&M/IMG-10fcf5999bb88f9227d2f2d0ffaa9bac-V.jpg',
    'M&M/IMG-118286d9928590fe8b00477eeaa2d906-V.jpg',
    'M&M/IMG-11da1d4c6c56584eb21e976f2a6d81fd-V.jpg',
    'M&M/IMG-11ec3f953ad9f1e24aa0a3a35ddc00e3-V.jpg',
    'M&M/IMG-12982ff81a0d212aee5b10bbee932739-V.jpg',
    'M&M/IMG-148527c4b80243a221be3ddc984ce71c-V.jpg',
    'M&M/IMG-14f138288a746c44e6df62b08571986e-V.jpg',
    'M&M/IMG-1680b0c1b9f6a2862803accb19173ace-V.jpg',
    'M&M/IMG-17b6f5502974274824a632b440ee24ee-V.jpg',
    'M&M/IMG-183f36f1bf14576bb86352335e8c6ff2-V.jpg',
    'M&M/IMG-1a3be3853ba7eafe21b9eb4d39e95985-V.jpg',
    'M&M/IMG-1c3ca483fe00513af1013f5bb54a8b3c-V.jpg',
    'M&M/IMG-1cc82bc08bacdfe03caca63fe5c18827-V.jpg',
    'M&M/IMG-1e03fe2873f424fcdafc3012d0504560-V.jpg',
    'M&M/IMG-1e56928c0575a6af4f66f5e712f59c51-V.jpg',
    'M&M/IMG-1ea5c865ca67451d80b7542e2502c9bd-V.jpg',
    'M&M/IMG-1f0f1f062501870d7013666e6fd7b02a-V.jpg',
    'M&M/IMG-1f273c95ef0b777a89e7b2fb91cb1da6-V.jpg',
    'M&M/IMG-204063bb53d2e186ed5dd5fbb3029c85-V.jpg',
    'M&M/IMG-20d30a1ce6e69c023edb0d719738aea6-V.jpg',
    'M&M/IMG-20d432904386b925590d391fc62bb595-V.jpg',
    'M&M/IMG-22d8799c62619d8186722bd53cc94390-V.jpg',
    'M&M/IMG-23aef2083a3b8cc3cbd19e696286cb90-V.jpg',
    'M&M/IMG-24261e5e3e628d1fd20eb07b2de8d6ae-V.jpg',
    'M&M/IMG-244b3f9f7cf023d19ee30e62f2b4d74a-V.jpg',
    'M&M/IMG-258788a3f0ee2ac66e8503a55b442e9c-V.jpg',
    'M&M/IMG-26535f0ef99b224c201b5731072431d7-V.jpg',
    'M&M/IMG-274436d7ef989bbff8edbd1331dd58a9-V.jpg',
    'M&M/IMG-2752e193a41e2ec0056f5be1e2e71141-V.jpg',
    'M&M/IMG-285ff56cb38f18c432775b917398945f-V.jpg',
    'M&M/IMG-28fc0769903957ce8c8bc56d72486d49-V.jpg',
    'M&M/IMG-292fa69e901cb693b7cc695aeaa82e21-V.jpg',
    'M&M/IMG-296717129fa3db9606d81233e579a7dd-V.jpg',
    'M&M/IMG-2a3558bbedb8a50296e3eb2a32aaa4ca-V.jpg',
    'M&M/IMG-2af77f5c5132f1d1fb41ad17ed3e5b82-V.jpg',
    'M&M/IMG-2e7ecd98c49ffff7e746407bb5e401bf-V.jpg',
    'M&M/IMG-2f097f682a2d48fd8b62856d5b4b0335-V.jpg',
    'M&M/IMG-2f59c5a476b0ae991b79d74dd39280aa-V.jpg',
    'M&M/IMG-311e0f96f865965d9e44e3da759c1bf3-V.jpg',
    'M&M/IMG-3269bc8564ccfd66a3e053df0ecfb6d6-V.jpg',
    'M&M/IMG-3502504c9f1111737d366e9eb7c07bf6-V.jpg',
    'M&M/IMG-35d11c65fe1e628dc176d69858f45fe4-V.jpg',
    'M&M/IMG-365042646e2b0b67681864f1c18faf78-V.jpg',
    'M&M/IMG-37355b24d2a80ccd1fb44a7bede8f21e-V.jpg',
    'M&M/IMG-37ac995aae4e2c619caf3f43753d1238-V.jpg',
    'M&M/IMG-381bcd1f4ef113cf998cdaa66685370d-V.jpg',
    'M&M/IMG-384ab2a41bcde6d2fe9632f5cad76180-V.jpg',
    'M&M/IMG-386173fbf594dafe76c8fc39dc143670-V.jpg',
    'M&M/IMG-390e84ba3cde20d84bc64fcfc099d7a0-V.jpg',
    'M&M/IMG-39d07d2edb6c586aa6b6f953b1743083-V.jpg',
    'M&M/IMG-3a448321e20f90e35f32945375ded317-V.jpg',
    'M&M/IMG-3ac67e87a52985dce5fb9e7a0aefd44b-V.jpg',
    'M&M/IMG-3af4ef8ca54bb12fc3c91c549688f6da-V.jpg',
    'M&M/IMG-3b5e9055c7adc291efbb252094908caf-V.jpg',
    'M&M/IMG-3babba5dccdd50aa9f2766208b7f97b2-V.jpg',
    'M&M/IMG-3c8ecd4621f6cd068f2f4f0d8d00b0f5-V.jpg',
    'M&M/IMG-3ecd295454047f05c02ba92049ef0924-V.jpg',
    'M&M/IMG-3ede47478d9f05cb97e8d8bdd8e4af71-V.jpg',
    'M&M/IMG-404d9ab5410dad685364093fcbb6a9d3-V.jpg',
    'M&M/IMG-41962d319a93d723ee9e620f1ad2375c-V.jpg',
    'M&M/IMG-41b39bd01f968f7bc585f0f6eb53b36f-V.jpg',
    'M&M/IMG-4256b63d41cefdba5b0abc64d32c9178-V.jpg',
    'M&M/IMG-44540ab477f73430d6ac6fa852540d17-V.jpg',
    'M&M/IMG-451e74ad893a975ddba78007b773aeed-V.jpg',
    'M&M/IMG-45a9977d988c0e213b1e7470b42eb934-V.jpg',
    'M&M/IMG-469621f6c672f596e70ba582440853b5-V.jpg',
    'M&M/IMG-46aecb2be78bbba4372d0095061ee71b-V.jpg',
    'M&M/IMG-4826f94e98c53f61ba91a407d4a1bec2-V.jpg',
    'M&M/IMG-486983da6b6c7c1e5e1b53edadbd30d0-V.jpg',
    'M&M/IMG-486e251b85fb1fd1e78db020748cb2db-V.jpg',
    'M&M/IMG-48fdbe062cb893a5008ec865e9a70bf5-V.jpg',
    'M&M/IMG-4af332b7ee37e34d84e4ef0c87da9366-V.jpg',
    'M&M/IMG-4bb29bbe40b14c50725b24ab37cf2f94-V.jpg',
    'M&M/IMG-4c87983b09508e22c9db784cab2d0cd0-V.jpg',
    'M&M/IMG-4ce259e0bbfca7d79196e24a26291199-V.jpg',
    'M&M/IMG-4d49432d1ba020e0a539433f06f80674-V.jpg',
    'M&M/IMG-4fb8f9ac73452138b9a8f96b5c393c9f-V.jpg',
    'M&M/IMG-4fdd9f138b07ca22a14e9d93af7eb3fd-V.jpg',
    'M&M/IMG-501f09be284f8c32ccfe5be3e6d2cd46-V.jpg',
    'M&M/IMG-50f701c880a633ea9aee3eda47bd02e8-V.jpg',
    'M&M/IMG-517042bc567377d1d6916862247cbaec-V.jpg',
    'M&M/IMG-5289c613824065f2df8593b91bf6fc66-V.jpg',
    'M&M/IMG-53bd071d41db1a4b8d23d85e54ebaa86-V.jpg',
    'M&M/IMG-54113ff3afd2fb8fb179f9a14c5c98cf-V.jpg',
    'M&M/IMG-5475be8cd2f0d74222f4fadf52fc0182-V.jpg',
    'M&M/IMG-5493950d4e82920119b505be6baec314-V.jpg',
    'M&M/IMG-56f3b0117ee2b41527463ce207613eaa-V.jpg',
    'M&M/IMG-57ec635611498825289a94ed32fbaaa8-V.jpg',
    'M&M/IMG-58620ebe6736ab0489e5f9e2adc9798b-V.jpg',
    'M&M/IMG-594917df7d818b5f3a30730f6ad5b378-V.jpg',
    'M&M/IMG-59926e64e7c68d5973c68955ba41d26e-V.jpg',
    'M&M/IMG-59ecb664532f35066207eda57a0ac85f-V.jpg',
    'M&M/IMG-5b898f719383e75dea9311116e7f387b-V.jpg',
    'M&M/IMG-5c462f6e4bfcf68df8c25af3e20207cf-V.jpg',
    'M&M/IMG-5f10bd73b9be59f5c3931e0d3c085a73-V.jpg',
    'M&M/IMG-5fad40dc792abf708af44949a15ced86-V.jpg',
    'M&M/IMG-5fbd3776fd69a7162b8d1e7634efa3da-V.jpg',
    'M&M/IMG-6057d283690c06f37e5f2e2f97a8164a-V.jpg',
    'M&M/IMG-615a398f4484c5d297fa146c5e452367-V.jpg',
    'M&M/IMG-616ce9a19aa944ce2d6f868970de73b3-V.jpg',
    'M&M/IMG-6174e1cea0b4be2a5cec42418353a72c-V.jpg',
    'M&M/IMG-62989549b4ea9d219fcc0e5ecfdf25db-V.jpg',
    'M&M/IMG-634df8d2d69295cb1c86436452069c50-V.jpg',
    'M&M/IMG-6354c6683ed7cdd02045c15f0f1e41aa-V.jpg',
    'M&M/IMG-6499517b5d2ddc40d3e9f14840c2321c-V.jpg',
    'M&M/IMG-6547dc94b1696744084db5ad19d9d9d2-V.jpg',
    'M&M/IMG-656f3556d3110462288725a809330d5c-V.jpg',
    'M&M/IMG-65b0f3ba114dfc555b728c1090f99e9b-V.jpg',
    'M&M/IMG-65b424650fbd63e0e2e45176ae2eccbc-V.jpg',
    'M&M/IMG-669a1bce2d6aff99db13a9e2ead7f265-V.jpg',
    'M&M/IMG-66e6b60da69bc67f0585eed33df82197-V.jpg',
    'M&M/IMG-678b2e1362de73f07ee947a5c0b32ab5-V.jpg',
    'M&M/IMG-69dd97a7fe017e304e7484fdc3cc9f4c-V.jpg',
    'M&M/IMG-6d4c459802ee398901766619d75e6934-V.jpg',
    'M&M/IMG-6db54df47f0a326fda71ad6040cd48dd-V.jpg',
    'M&M/IMG-6dd8fbd5ace7364cbc02b4d559a74be1-V.jpg',
    'M&M/IMG-70af4e3246ebea930fc17fbf9b7700fc-V.jpg',
    'M&M/IMG-70d498e2df9e10e099f38d467ea03c51-V.jpg',
    'M&M/IMG-70e221fdc85cf671decb32ad0e86bdb5-V.jpg',
    'M&M/IMG-71f7b6e5804fcc5bdcfd8fc143e20963-V.jpg',
    'M&M/IMG-73f664f8507bf689a0e448da63d5b889-V.jpg',
    'M&M/IMG-747c4765df85569f7e824e4a64d96a1c-V.jpg',
    'M&M/IMG-74bc26f0172f37fb6e54fad53f5c4308-V.jpg',
    'M&M/IMG-75154ee274ba25b139e58b1379489248-V.jpg',
    'M&M/IMG-752602e098d7e05f684e7ff39daf5348-V.jpg',
    'M&M/IMG-756a0df3ce039e0e92997a876e55f419-V.jpg',
    'M&M/IMG-75bb6370379fce9158d4dbf4e647264f-V.jpg',
    'M&M/IMG-78561904c7e5bdb02a7cd5be1e56f745-V.jpg',
    'M&M/IMG-78d964961e4e4ddda13ec0190f68454c-V.jpg',
    'M&M/IMG-7a165b0e39641708cf76d9694e879f10-V.jpg',
    'M&M/IMG-7a9af25dd073c6c24da9b958696d4a5e-V.jpg',
    'M&M/IMG-7b7cf13c5024264b5deef334e0ed0379-V.jpg',
    'M&M/IMG-7c59a357b52c11e008d30deaabf98aa0-V.jpg',
    'M&M/IMG-7ceab7e7cb3d0cf38be7d35bf9991535-V.jpg',
    'M&M/IMG-7dcab6eaccf6161a68d9eb3ae2779208-V.jpg',
    'M&M/IMG-8051a8790a979d1a0a43f44f57bcf1f2-V.jpg',
    'M&M/IMG-81fa6ea96e7188aef505ba22290650bf-V.jpg',
    'M&M/IMG-823622f18276c57b57d0209d42d660cf-V.jpg',
    'M&M/IMG-8278ef508deee2717404ab9f330e07f8-V.jpg',
    'M&M/IMG-829583dee9e9ed7399f3185d10cec586-V.jpg',
    'M&M/IMG-832e41d151f7a137a787f417d70cc91a-V.jpg',
    'M&M/IMG-83f76e89533dc46993f9b6beff19b67f-V.jpg',
    'M&M/IMG-8445c4841762df2ca4ff9cbe6c78124a-V.jpg',
    'M&M/IMG-86504220d26036f713434fbe9a0a61f0-V.jpg',
    'M&M/IMG-8688ac7c965e06695aefa404ebdc8ce6-V.jpg',
    'M&M/IMG-86b0c9d1855699a6fca026e194a2e533-V.jpg',
    'M&M/IMG-8764fdad45b4d4521b3c43cbeff7e384-V.jpg',
    'M&M/IMG-87b7fc107723b003edc71289354eeb8a-V.jpg',
    'M&M/IMG-87d786aed5c1cef047ae4ab86b39eb7e-V.jpg',
    'M&M/IMG-88c8fb3d6d6e6b237b8672f677aed24b-V.jpg',
    'M&M/IMG-88e403f40735c0e4932e45d604073e41-V.jpg',
    'M&M/IMG-8c4cf9e006a85a55c9b1de9d9c0393de-V.jpg',
    'M&M/IMG-8cbb863ee3da715b06240bfe2718af34-V.jpg',
    'M&M/IMG-8cd870b688b6318d902386ab2b0659d3-V.jpg',
    'M&M/IMG-8f05bd508a23d71de11674cb593b780e-V.jpg',
    'M&M/IMG-8f20871ce7460148dc74f8084d7d261b-V.jpg',
    'M&M/IMG-8f219394d13b5e68fa11c0a23f181447-V.jpg',
    'M&M/IMG-8f6a8626dd724941cc6ea7f46ce1d4e4-V.jpg',
    'M&M/IMG-907008ace93bffb25d2be29b942b1784-V.jpg',
    'M&M/IMG-90f8ab5b28f8a93e2635efb1e3d0c8d5-V.jpg',
    'M&M/IMG-90f8e71f40321010b14006a49e207ef1-V.jpg',
    'M&M/IMG-9124c8790a5053e0dc94151d5fb6aac3-V.jpg',
    'M&M/IMG-92c22f6165d543520cdf1f39203d6a4e-V.jpg',
    'M&M/IMG-92c93920561884f520f32959de270ca8-V.jpg',
    'M&M/IMG-944ec442274850c4d92b1390a85563d4-V.jpg',
    'M&M/IMG-9518ea1ad12e77a77f014d4ff16339a0-V.jpg',
    'M&M/IMG-9652a5d5e9b9e41f02c0f23a1551cf09-V.jpg',
    'M&M/IMG-9713ff15034a7590a48a671ab2770e22-V.jpg',
    'M&M/IMG-97e997a78d0d888239efb28eed544b41-V.jpg',
    'M&M/IMG-9ab68cfc9d956bee910dad2dbbb7213e-V.jpg',
    'M&M/IMG-9d754099527d9dfaf02180847eaea763-V.jpg',
    'M&M/IMG-9ee901a0c71454f62e039bc177dcb797-V.jpg',
    'M&M/IMG-9f7a16faf0546a1f6103a965e1af2b6a-V.jpg',
    'M&M/IMG-a0d108462db5b18e595f9341b5baabbb-V.jpg',
    'M&M/IMG-a152cf3bb5b57544e290c6a678195f07-V.jpg',
    'M&M/IMG-a1c5c62dda178e53a95ec64c9725f310-V.jpg',
    'M&M/IMG-a318b5d7835d24f3aa86adca87682f4d-V.jpg',
    'M&M/IMG-a441a581402b4fc0b14564324419f64e-V.jpg',
    'M&M/IMG-a5680920b3fdf2d40e0fdf2a5e998c49-V.jpg',
    'M&M/IMG-a5f2f8648a360a143e70551e89f3f04b-V.jpg',
    'M&M/IMG-a606b7364330d89a50164cacc4e0264b-V.jpg',
    'M&M/IMG-a6f7987fff364a36463dcbc30227fe7d-V.jpg',
    'M&M/IMG-a73d5d0bb3867d8d649dbcf59c9e6d86-V.jpg',
    'M&M/IMG-abcddf408173c5f9d0f32634e1d2ec25-V.jpg',
    'M&M/IMG-ada897e9dcfc617169cb0d1c6709dfc6-V.jpg',
    'M&M/IMG-b216c93871740b09bb65e48c83a1f665-V.jpg',
    'M&M/IMG-b2a09fba25ecd09d13f79f30f4468a51-V.jpg',
    'M&M/IMG-b3308dacbc5b626bb216f155d1fc7065-V.jpg',
    'M&M/IMG-b40df45ec84b5287c9f9ba82d351a886-V.jpg',
    'M&M/IMG-b4c45052bf4c0d8ec62e63fa3bd440e3-V.jpg',
    'M&M/IMG-b5676223f7c3fda30cbb994d4083a66b-V.jpg',
    'M&M/IMG-b6582dad3e58d5e75e6083c77d70e885-V.jpg',
    'M&M/IMG-b676118ff7ea1cd76c8fa2241d7e3dc0-V.jpg',
    'M&M/IMG-b6b2a49d908903de0eb293f452b322c9-V.jpg',
    'M&M/IMG-b7d0a33da5ba1fe105948ee8f2df166b-V.jpg',
    'M&M/IMG-b834ca3f90338afd77695c8f989a6897-V.jpg',
    'M&M/IMG-b8439142237b626d470015567639bcdd-V.jpg',
    'M&M/IMG-bb0e01d07e50a11aff0654933cb9744e-V.jpg',
    'M&M/IMG-bb3f5c8b31b177f92c2f0ead9fc515b8-V.jpg',
    'M&M/IMG-bb71c4209eaa32ed95dd8fd7fa5ddbe1-V.jpg',
    'M&M/IMG-bbb8d9ee84b9d80d253f9ebbb8244f55-V.jpg',
    'M&M/IMG-bc34d7e1726bb7ac075df8c17ef19044-V.jpg',
    'M&M/IMG-bc4198871d719fa5d51d4b419373d4d7-V.jpg',
    'M&M/IMG-bd64d9f150c35bebf681dedf96fe13af-V.jpg',
    'M&M/IMG-bd71d54803fe070cd25a6e75cad1b722-V.jpg',
    'M&M/IMG-bea0b91fac0896330a0c536aec4f94dd-V.jpg',
    'M&M/IMG-bece66abceb4965eafec300dc1ab696f-V.jpg',
    'M&M/IMG-bf52ce4b67857bb9efbf3a0422db4ce9-V.jpg',
    'M&M/IMG-bf551cabd696253bfb3375db24ecdb09-V.jpg',
    'M&M/IMG-bf80fe9a238305634b05ea17f1d6699a-V.jpg',
    'M&M/IMG-bfb605723846f1c9d1eb65bd1cdc657b-V.jpg',
    'M&M/IMG-c06b290797160c871b3378d58f1f543d-V.jpg',
    'M&M/IMG-c0fe6ccde57ed968f3192094b8911ee5-V.jpg',
    'M&M/IMG-c48e50b23314d50f3da1cc309b376071-V.jpg',
    'M&M/IMG-c5cadfd60c01d5bcb23a30b703eebd78-V.jpg',
    'M&M/IMG-c6337bcc9c6bc4e13160abd86e7fa704-V.jpg',
    'M&M/IMG-c6bc70a1aa67a5a35222cf620aa24a1b-V.jpg',
    'M&M/IMG-c6ee58435e8c9c604c6797b284512a56-V.jpg',
    'M&M/IMG-c6f4bd65e497e368be602f22b26a73d9-V.jpg',
    'M&M/IMG-c73a08e3a2b8a2cb9ab5945722a41b1f-V.jpg',
    'M&M/IMG-c8c40329fc69b9175c84fa2853386492-V.jpg',
    'M&M/IMG-c8d2f677ce3280c346780ed07f747de9-V.jpg',
    'M&M/IMG-c9063759e0ebd3ea9fb85bfe8b125a93-V.jpg',
    'M&M/IMG-ca380cbf9992b56ab15602a0bee5f11d-V.jpg',
    'M&M/IMG-ca8662efbae95e8fcc02d01dfdd336b8-V.jpg',
    'M&M/IMG-cac68e68c281e872497bd8ec1d479295-V.jpg',
    'M&M/IMG-cb76e467b84803a57024eab6fb277418-V.jpg',
    'M&M/IMG-cbcc65e74c98123579a91163cfb34ad2-V.jpg',
    'M&M/IMG-cc052bb4b5d14baa0e19ca3f9a7c069d-V.jpg',
    'M&M/IMG-cc0c1c2e8353cfa33de5c93ef8f9e169-V.jpg',
    'M&M/IMG-cc4fe93b1c45a242caa69d7232d9c94b-V.jpg',
    'M&M/IMG-cda05ec5d34b938ce86301e8d0ddb591-V.jpg',
    'M&M/IMG-ce6766536c540ced75a5d5d8cbdb9108-V.jpg',
    'M&M/IMG-d05dcfd426d73faaff6398fb0a7348b3-V.jpg',
    'M&M/IMG-d0997f31e4dcdc8c523239ff031eab20-V.jpg',
    'M&M/IMG-d17cba24ed862e801a26d2cbebefa67d-V.jpg',
    'M&M/IMG-d29d3075ef47fda2b363953516cdc613-V.jpg',
    'M&M/IMG-d2f06f4d8ed24699cc1e6f1a7cfc3dc3-V.jpg',
    'M&M/IMG-d360ba12c7849a25e375acce682c3012-V.jpg',
    'M&M/IMG-d4f6446fa69329c16c685033488d28fe-V.jpg',
    'M&M/IMG-d5efe0fbc342badc839d184293578f43-V.jpg',
    'M&M/IMG-d76518d7133e716c5dfe844f82fe6994-V.jpg',
    'M&M/IMG-d81c64f5701dc7c5c510131c315e6c2c-V.jpg',
    'M&M/IMG-d86df0a1eaf5cf709c2ce602f226f7c9-V.jpg',
    'M&M/IMG-d8f227c50e55041f25a9f8f5705b6494-V.jpg',
    'M&M/IMG-d9370d9f69af003cb3577b7caa6b88bb-V.jpg',
    'M&M/IMG-daeb34e98474189cce9d0887dc6cee01-V.jpg',
    'M&M/IMG-db16844220ad5cabc947148e88db2993-V.jpg',
    'M&M/IMG-db65c0ce891577e64a85a6e4f4c6fd4c-V.jpg',
    'M&M/IMG-db7fce8d0d5dffa564345adda8cb1eb6-V.jpg',
    'M&M/IMG-dd5bb3c6be259c51fbadc7d7060e5638-V.jpg',
    'M&M/IMG-de44aed760ef9bfe22705a77a9f97872-V.jpg',
    'M&M/IMG-de93f4eae2d18c5580092ffcd1bf22b4-V.jpg',
    'M&M/IMG-e0595278c9c0657dc74ab94afbc357de-V.jpg',
    'M&M/IMG-e1d3830b6fd918b78aae8255b24a609f-V.jpg',
    'M&M/IMG-e29af0d9ed41288ac37984a056faf155-V.jpg',
    'M&M/IMG-e2dce0a508752ea26a9a9793ba0ae2fc-V.jpg',
    'M&M/IMG-e40c102a73759b00cdf1987ebadd52aa-V.jpg',
    'M&M/IMG-e4d5dcd4e57072fcb8dc26fe42a46d17-V.jpg',
    'M&M/IMG-e53f1167390a35c896f357bca33b6888-V.jpg',
    'M&M/IMG-e5489b9e0cfbca695a9d144b9942f789-V.jpg',
    'M&M/IMG-e63c021735f01e9b6197e6133df6220d-V.jpg',
    'M&M/IMG-e6b65a7798e9aa9b1f3b2e5a92056fb7-V.jpg',
    'M&M/IMG-e75196846d20fb4c37df2214dab19d07-V.jpg',
    'M&M/IMG-e75c2549ed2b1380f574ea6ce5f4ef0b-V.jpg',
    'M&M/IMG-e7c91607e22a92be5a18bcac21581f59-V.jpg',
    'M&M/IMG-ea46cb8445c62e10a6fa11b61221c422-V.jpg',
    'M&M/IMG-ea90ee89fd46905a41dbebbbb9d598e2-V.jpg',
    'M&M/IMG-ebaa13a30ceaef96581e14f3465cfa15-V.jpg',
    'M&M/IMG-ef954ed96fbaa3143f4ec82646ae075f-V.jpg',
    'M&M/IMG-f18d789a53f37326c7a5c3914836eb6a-V.jpg',
    'M&M/IMG-f2baee076a41dc37ce44816a3485d83f-V.jpg',
    'M&M/IMG-f2ce8eb402119240a00f3e2bec436105-V.jpg',
    'M&M/IMG-f590c36fffccd7541943d21a4e8c3c52-V.jpg',
    'M&M/IMG-f794af078d78d466acd7002548e47623-V.jpg',
    'M&M/IMG-f92389248f5f71557fb814ee9ca9a891-V.jpg',
    'M&M/IMG-f93a9f214b38fbe0ba559a9f9c794d2f-V.jpg',
    'M&M/IMG-f9b3ff35625088de1c67be49b9bfc0f0-V.jpg',
    'M&M/IMG-f9ca8357c2945cca68322219d31fa5b5-V.jpg',
    'M&M/IMG-fa67e28f0707b9a78f0dfba9630ae784-V.jpg',
    'M&M/IMG-fad539ddac2db589cdbdd5efada7ba44-V.jpg',
    'M&M/IMG-fb9937b65a2fe7a57ccb5bb62b312d29-V.jpg',
    'M&M/IMG-fd96dda79b9e5800fc5943a52d68e972-V.jpg',
    'M&M/IMG-fe339a5dfa20bf58902d175ed606a3d4-V.jpg',
    'M&M/IMG-fe58599843514fb96de36ae8fbfab9d4-V.jpg',
    'M&M/IMG-ffaca17dd435907a47b170857dc2670a-V.jpg',
    'M&M/IMG-20240418-WA0000.jpg',
    'M&M/IMG-20251001-WA0000.jpg',
    'M&M/IMG-20251001-WA0001.jpg',
    'M&M/IMG-20251001-WA0002.jpg',
    'M&M/IMG-20251001-WA0003.jpg',
    'M&M/IMG-20251001-WA0004.jpg',
    'M&M/IMG-20251001-WA0005.jpg',
    'M&M/IMG-20251001-WA0006.jpg',
    'M&M/IMG-20251001-WA0007.jpg',
    'M&M/IMG-20251001-WA0008.jpg',
    'M&M/IMG-20251001-WA0009.jpg',
    'M&M/IMG-20251001-WA0010.jpg',
    'M&M/IMG-20251001-WA0011.jpg',
    'M&M/IMG-20251001-WA0012.jpg',
    'M&M/IMG-20251001-WA0013.jpg',
    'M&M/IMG-20251001-WA0014.jpg',
    'M&M/IMG-20251001-WA0015.jpg',
    'M&M/IMG-20251001-WA0016.jpg',
    'M&M/IMG-20251001-WA0018.jpg',
    'M&M/IMG-20251001-WA0020.jpg',
    'M&M/IMG-20251001-WA0023.jpg',
    'M&M/IMG-20251001-WA0024.jpg',
    'M&M/IMG-20251001-WA0026.jpg',
    'M&M/IMG-20251001-WA0027.jpg',
    'M&M/IMG-20251001-WA0028.jpg',
    'M&M/IMG-20251001-WA0030.jpg',
    'M&M/IMG-20251001-WA0032.jpg',
    'M&M/IMG-20251001-WA0035.jpg',
    'M&M/IMG-20251001-WA0045.jpg',
    'M&M/IMG-20251001-WA0046.jpg',
    'M&M/IMG-20251001-WA0049.jpg',
    'M&M/IMG-20251001-WA0050.jpg',
    'M&M/IMG-20251001-WA0052.jpg',
    'M&M/IMG-20251001-WA0053.jpg',
    'M&M/IMG-20251001-WA0054.jpg',
    'M&M/IMG-20251001-WA0055.jpg',
    'M&M/IMG-20251001-WA0056.jpg',
    'M&M/IMG-20251001-WA0057.jpg',
    'M&M/IMG-20251001-WA0058.jpg',
    'M&M/IMG-20251001-WA0059.jpg',
    'M&M/IMG-20251001-WA0063.jpg',
    'M&M/IMG-20251001-WA0064.jpg',
    'M&M/IMG-20251001-WA0065.jpg',
    'M&M/IMG-20251001-WA0066.jpg',
    'M&M/IMG-20251001-WA0067.jpg',
    'M&M/IMG-20251001-WA0068.jpg',
    'M&M/IMG-20251001-WA0069.jpg',
    'M&M/IMG-20251001-WA0070.jpg',
    'M&M/IMG-20251001-WA0071.jpg',
    'M&M/IMG-20251001-WA0072.jpg',
    'M&M/IMG-20251001-WA0073.jpg',
    'M&M/IMG-20251001-WA0074.jpg',
    'M&M/IMG-20251001-WA0075.jpg',
    'M&M/IMG-20251001-WA0076.jpg',
    'M&M/IMG-20251001-WA0077.jpg',
    'M&M/IMG-20251001-WA0078.jpg',
    'M&M/IMG-20251001-WA0080.jpg',
    'M&M/Screenshot_2024-09-01-10-43-01-298_com.miui.mediaeditor-edit.jpg',
    'M&M/Screenshot_2024-10-30-06-28-35-919_com.instagram.android-edit.jpg',
    'M&M/Screenshot_2025-01-13-02-30-22-005_com.instagram.android.jpg',
    'M&M/Screenshot_2025-01-22-14-45-43-902_com.instagram.android.jpg'
];

function loadPhotos() {
    photoGallery.innerHTML = '';
    let allPhotos = [...galleryPhotos];
    const savedPhotos = cacheSys.getPhotosData();
    if (savedPhotos.added && Array.isArray(savedPhotos.added)) {
        allPhotos = [...allPhotos, ...savedPhotos.added];
    }
    const deletedPhotos = savedPhotos.deleted || [];
    allPhotos = allPhotos.filter(photo => !deletedPhotos.includes(photo));
    paginationSettings.allPhotos = allPhotos;
    paginationSettings.totalPages = Math.ceil(allPhotos.length / paginationSettings.itemsPerPage);
    paginationSettings.currentPage = 1;
    displayCurrentPage();
    updatePaginationControls();
}

function displayCurrentPage() {
    photoGallery.innerHTML = '';
    const { currentPage, itemsPerPage, allPhotos } = paginationSettings;
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const photosToShow = allPhotos.slice(startIdx, endIdx);
    
    photosToShow.forEach((photo, index) => {
        const globalIndex = startIdx + index;
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-photo', photo);
        
        const img = document.createElement('img');
        img.dataset.src = photo;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3C/svg%3E';
        img.alt = `Our Memory ${globalIndex + 1}`;
        img.className = 'lazy-image';
        
        img.addEventListener('click', function() {
            openImageModal(photo);
        });
        
        img.onerror = function() {
            galleryItem.style.display = 'none';
        };
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'gallery-delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            deletePhoto(photo, galleryItem);
        });
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(deleteBtn);
        photoGallery.appendChild(galleryItem);
    });
    
    observeLazyImages();
}

function observeLazyImages() {
    const images = document.querySelectorAll('.lazy-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-image');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    images.forEach(img => imageObserver.observe(img));
}

function updatePaginationControls() {
    const { currentPage, totalPages } = paginationSettings;
    let paginationDiv = document.getElementById('paginationControls');
    if (!paginationDiv) {
        paginationDiv = document.createElement('div');
        paginationDiv.id = 'paginationControls';
        paginationDiv.className = 'pagination-controls';
        photoGallery.parentElement.appendChild(paginationDiv);
    }
    paginationDiv.innerHTML = '';
    if (totalPages <= 1) return;
    
    const firstBtn = document.createElement('button');
    firstBtn.textContent = '⏮ Prva';
    firstBtn.disabled = currentPage === 1;
    firstBtn.className = 'pagination-btn-first';
    firstBtn.addEventListener('click', () => {
        paginationSettings.currentPage = 1;
        displayCurrentPage();
        updatePaginationControls();
        setTimeout(() => {
            photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    paginationDiv.appendChild(firstBtn);
    
    const back5Btn = document.createElement('button');
    back5Btn.textContent = '← -5';
    back5Btn.disabled = currentPage <= 5;
    back5Btn.className = 'pagination-btn-skip';
    back5Btn.addEventListener('click', () => {
        paginationSettings.currentPage = Math.max(1, paginationSettings.currentPage - 5);
        displayCurrentPage();
        updatePaginationControls();
        setTimeout(() => {
            photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    paginationDiv.appendChild(back5Btn);
    
    const back2Btn = document.createElement('button');
    back2Btn.textContent = '← -2';
    back2Btn.disabled = currentPage <= 2;
    back2Btn.className = 'pagination-btn-skip';
    back2Btn.addEventListener('click', () => {
        paginationSettings.currentPage = Math.max(1, paginationSettings.currentPage - 2);
        displayCurrentPage();
        updatePaginationControls();
        setTimeout(() => {
            photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    paginationDiv.appendChild(back2Btn);
    
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Prethodna';
    prevBtn.disabled = currentPage === 1;
    prevBtn.className = 'pagination-btn-prev-next';
    prevBtn.addEventListener('click', () => {
        if (paginationSettings.currentPage > 1) {
            paginationSettings.currentPage--;
            displayCurrentPage();
            updatePaginationControls();
            setTimeout(() => {
                photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
    paginationDiv.appendChild(prevBtn);
    
    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `${currentPage} / ${totalPages}`;
    paginationDiv.appendChild(pageInfo);
    
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Sledeća →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className = 'pagination-btn-prev-next';
    nextBtn.addEventListener('click', () => {
        if (paginationSettings.currentPage < totalPages) {
            paginationSettings.currentPage++;
            displayCurrentPage();
            updatePaginationControls();
            setTimeout(() => {
                photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
    paginationDiv.appendChild(nextBtn);
    
    const next2Btn = document.createElement('button');
    next2Btn.textContent = '+2 →';
    next2Btn.disabled = currentPage >= totalPages - 1;
    next2Btn.className = 'pagination-btn-skip';
    next2Btn.addEventListener('click', () => {
        paginationSettings.currentPage = Math.min(totalPages, paginationSettings.currentPage + 2);
        displayCurrentPage();
        updatePaginationControls();
        setTimeout(() => {
            photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    paginationDiv.appendChild(next2Btn);
    
    const next5Btn = document.createElement('button');
    next5Btn.textContent = '+5 →';
    next5Btn.disabled = currentPage >= totalPages - 4;
    next5Btn.className = 'pagination-btn-skip';
    next5Btn.addEventListener('click', () => {
        paginationSettings.currentPage = Math.min(totalPages, paginationSettings.currentPage + 5);
        displayCurrentPage();
        updatePaginationControls();
        setTimeout(() => {
            photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    paginationDiv.appendChild(next5Btn);
    
    const lastBtn = document.createElement('button');
    lastBtn.textContent = 'Poslednja ⏭';
    lastBtn.disabled = currentPage === totalPages;
    lastBtn.className = 'pagination-btn-last';
    lastBtn.addEventListener('click', () => {
        paginationSettings.currentPage = totalPages;
        displayCurrentPage();
        updatePaginationControls();
        setTimeout(() => {
            photoGallery.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
    paginationDiv.appendChild(lastBtn);
}

function deletePhoto(photoSrc, element) {
    element.style.transition = 'all 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        element.remove();
        
        const savedPhotos = cacheSys.getPhotosData();
        if (!savedPhotos.deleted) savedPhotos.deleted = [];
        
        if (!savedPhotos.deleted.includes(photoSrc)) {
            savedPhotos.deleted.push(photoSrc);
        }
        
        localStorage.setItem('galleryPhotos', JSON.stringify(savedPhotos));
        cacheSys.invalidateCache();
    }, 300);
}

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const downloadBtn = document.getElementById('downloadBtn');

function openImageModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.classList.add('active');
    downloadBtn.onclick = function() {
        downloadImage(imageSrc);
    };
}

function closeImageModal() {
    imageModal.classList.remove('active');
}

modalClose.addEventListener('click', closeImageModal);

imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

function downloadImage(imageSrc) {
    if (imageSrc.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = 'memory.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        fetch(imageSrc)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = imageSrc.split('/').pop() || 'memory.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Download error:', error);
                window.open(imageSrc, '_blank');
            });
    }
}

const galleryGrid = document.getElementById('photoGallery');
const floatingZoom = document.getElementById('floatingZoom');
const floatZoomInBtn = document.getElementById('floatZoomIn');
const floatZoomOutBtn = document.getElementById('floatZoomOut');

let currentZoom = 100;
const minZoom = 50;
const maxZoom = 150;
const zoomStep = 10;

function updateZoom() {
    let minWidth = Math.round(70 + (currentZoom - 50) * (240 - 70) / (150 - 50));
    
    galleryGrid.style.gridTemplateColumns = `repeat(auto-fill, minmax(${minWidth}px, 1fr))`;
    
    if (document.getElementById('floatZoomLevel')) {
        document.getElementById('floatZoomLevel').textContent = `${currentZoom}%`;
    }
}

floatZoomInBtn.addEventListener('click', function() {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        updateZoom();
    }
});

floatZoomOutBtn.addEventListener('click', function() {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        updateZoom();
    }
});

document.addEventListener('wheel', function(e) {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        
        if (e.deltaY < 0) {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        } else {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        }
    }
}, { passive: false });

const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const uploadStatus = document.getElementById('uploadStatus');

uploadArea.addEventListener('click', function() {
    imageInput.click();
});

uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.style.backgroundColor = '#fff0f5';
    uploadArea.style.borderColor = '#e91e63';
});

uploadArea.addEventListener('dragleave', function() {
    uploadArea.style.backgroundColor = '#fff';
    uploadArea.style.borderColor = '#ddd';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.style.backgroundColor = '#fff';
    uploadArea.style.borderColor = '#ddd';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
});

imageInput.addEventListener('change', function(e) {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (files.length === 0) return;
    
    uploadStatus.textContent = `Učitavanju ${files.length} slika...`;
    uploadStatus.style.color = '#4CAF50';
    
    let processedCount = 0;
    const addedPhotos = [];
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            addedPhotos.push(e.target.result);
            processedCount++;
            
            if (processedCount === Array.from(files).filter(f => f.type.startsWith('image/')).length) {
                const savedPhotos = JSON.parse(localStorage.getItem('galleryPhotos') || '{}');
                if (!savedPhotos.added) savedPhotos.added = [];
                
                savedPhotos.added = [...savedPhotos.added, ...addedPhotos];
                localStorage.setItem('galleryPhotos', JSON.stringify(savedPhotos));
                
                uploadStatus.textContent = `✓ ${addedPhotos.length} slika uspešno učitane!`;
                uploadStatus.style.color = '#4CAF50';
                
                loadPhotos();
                
                imageInput.value = '';
                
                setTimeout(() => {
                    uploadStatus.textContent = '';
                }, 3000);
            }
        };
        
        reader.readAsDataURL(file);
    });
}
