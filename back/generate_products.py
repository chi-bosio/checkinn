import requests
import mimetypes

API_URL = "http://localhost:8080/api/products"
PRODUCTS = [
    {
        "name": "Mochila urbana Premium",
        "description": "Mochila compacta ideal para uso diario, fabricada con materiales resistentes al agua y múltiples compartimentos internos para mantener todo organizado.",
        "images": ["mochila1.avif", "mochila2.jpg", "mochila3.jpg", "mochila4.jpg", "mochila5.jpg"]
    },
    {
        "name": "Auriculares inalámbricos NoiseCancel",
        "description": "Auriculares Bluetooth con cancelación activa de ruido, sonido envolvente, batería de larga duración y diseño ergonómico.",
        "images": ["auris1.jpg", "auris2.jpg", "auris3.jpg", "auris4.jpg", "auris5.jpg"]
    },
    {
        "name": "Reloj Inteligente FitTrack Pro",
        "description": "Smartwatch multifuncional con monitoreo de ritmo cardíaco, seguimiento deportivo, notificaciones inteligentes y resistencia al agua hasta 50 metros.",
        "images": ["reloj1.jpg", "reloj2.jpg", "reloj3.jpg", "reloj4.webp", "reloj5.webp"]
    },
    {
        "name": "Cafetera Espresso Classic",
        "description": "Cafetera espresso semiautomática con bomba italiana de alta presión, vaporizador integrado para leche espumada y acabado en acero inoxidable.",
        "images": ["cafetera1.jpg", "cafetera2.jpeg", "cafetera3.webp", "cafetera4.webp", "cafetera5.jpg"]
    },
    {
        "name": "Lámpara LED Escritorio FlexLight",
        "description": "Lámpara LED regulable con múltiples temperaturas de color, diseño flexible, función de carga USB integrada y bajo consumo energético.",
        "images": ["lampara1.webp", "lampara2.jpeg", "lampara3.webp", "lampara4.jpeg", "lampara5.jpg"]
    },
    {
        "name": "Cámara deportiva ActionCam 4K",
        "description": "Cámara resistente al agua con grabación en calidad 4K, estabilización de imagen avanzada y múltiples accesorios para deportes extremos.",
        "images": ["camara1.jpg", "camara2.webp", "camara3.jpg", "camara4.jpeg", "camara5.webp"]
    },
    {
        "name": "Zapatillas deportivas RunFlex",
        "description": "Calzado deportivo ultraliviano, transpirable y cómodo, diseñado especialmente para corredores profesionales y amateurs.",
        "images": ["zapatilla1.jpg", "zapatilla2.jpg", "zapatilla3.jpg", "zapatilla4.jpg", "zapatilla5.webp"]
    },
    {
        "name": "Parlante portátil SoundBeat Mini",
        "description": "Altavoz Bluetooth portátil con sonido potente, batería recargable de hasta 10 horas de duración y diseño compacto fácil de transportar.",
        "images": ["parlante1.webp", "parlante2.webp", "parlante3.jpg", "parlante4.webp", "parlante5.jpg"]
    },
    {
        "name": "Set de yoga ZenPro",
        "description": "Kit completo de yoga con mat antideslizante, bloque de soporte, correa ajustable y bolsa transportadora ecológica.",
        "images": ["zenpro1.jpg", "zenpro2.jpg", "zenpro3.jpg", "zenpro4.jpg", "zenpro5.jpg"]
    },
    {
        "name": "Termo térmico EcoHot",
        "description": "Termo de acero inoxidable con aislamiento al vacío, mantiene bebidas calientes o frías hasta por 12 horas y tiene tapa anti-derrame.",
        "images": ["ecohot1.png", "ecohot2.jpg", "ecohot3.webp", "ecohot4.webp", "ecohot5.png"]
    },
    {
        "name": "Escritorio Gamer ProGamer X",
        "description": "Mesa gamer ergonómica con superficie espaciosa, soporte para auriculares, organizador de cables y luces LED personalizables.",
        "images": ["progamer1.jpg", "progamer2.png", "progamer3.jpeg", "progamer4.jpg", "progamer5.jpg"]
    },
    {
        "name": "Mouse inalámbrico ErgoTouch",
        "description": "Mouse ergonómico inalámbrico diseñado para evitar lesiones, con sensibilidad ajustable y botones personalizables para máxima comodidad.",
        "images": ["ergotouch1.jpg", "ergotouch2.webp", "ergotouch3.webp", "ergotouch4.jpg", "ergotouch5.webp"]
    },
    {
        "name": "Cafetera de cápsulas CoffeeStar",
        "description": "Máquina compacta para café en cápsulas compatible con múltiples sabores, operación sencilla y limpieza fácil.",
        "images": ["coffeestar1.webp", "coffeestar2.webp", "coffeestar3.webp", "coffeestar4.webp", "coffeestar5.webp"]
    },
    {
        "name": "Bicicleta eléctrica CityRide 500W",
        "description": "Bicicleta urbana eléctrica con motor potente de 500W, batería de larga autonomía, sistema de frenado seguro y diseño plegable.",
        "images": ["cityride1.avif", "cityride2.avif", "cityride3.webp", "cityride4.avif", "cityride5.avif"]
    },
    {
        "name": "Kit organizador de viaje TravelSet",
        "description": "Set de organizadores de viaje con diferentes tamaños y compartimentos para guardar ropa, calzado y accesorios de forma práctica y compacta.",
        "images": ["travelset1.jpg", "travelset2.webp", "travelset3.webp", "travelset4.webp", "travelset5.webp"]
    },
    {
        "name": "Teclado mecánico ProKeys RGB",
        "description": "Teclado mecánico con retroiluminación RGB personalizable, switches silenciosos y estructura resistente para largas sesiones de uso.",
        "images": ["prokeys1.jpg", "prokeys2.jpg", "prokeys3.jpg", "prokeys4.jpeg", "prokeys5.png"]
    },
    {
        "name": "Tablet UltraTab X10",
        "description": "Tablet de 10 pulgadas con pantalla Full HD, procesador octa-core y almacenamiento ampliable, ideal para entretenimiento y trabajo.",
        "images": ["ultratab1.webp", "ultratab2.webp", "ultratab3.jpeg", "ultratab4.webp", "ultratab5.avif"]
    },
    {
        "name": "Batería portátil PowerBank 20.000mAh",
        "description": "PowerBank de alta capacidad con doble salida USB y carga rápida, perfecto para viajes o largas jornadas fuera de casa.",
        "images": ["powerbank1.jpg", "powerbank2.jpg", "powerbank3.jpg", "powerbank4.jpg", "powerbank5.jpg"]
    },
    {
        "name": "Botella deportiva HydraMax",
        "description": "Botella reusable de 1 litro, libre de BPA, con diseño ergonómico y tapa hermética, ideal para deporte y actividades al aire libre.",
        "images": ["hydramax1.webp", "hydramax2.webp", "hydramax3.jpg", "hydramax4.jpg", "hydramax5.jpg"]
    },
    {
        "name": "Kit de herramientas HomeFix 120 piezas",
        "description": "Completo set de herramientas con estuche organizador, ideal para reparaciones y mantenimiento en el hogar.",
        "images": ["homefix1.webp", "homefix2.webp", "homefix3.webp", "homefix4.webp", "homefix5.jpeg"]
    },
    {
        "name": "Disco duro externo 1TB SpeedDrive",
        "description": "Disco duro portátil con velocidad de transferencia rápida y diseño compacto para almacenamiento seguro y cómodo.",
        "images": ["speeddrive1.webp", "speeddrive2.jpg", "speeddrive3.webp", "speeddrive4.jpg", "speeddrive5.jpg"]
    },
    {
        "name": "Robot aspirador CleanBot Pro",
        "description": "Aspiradora robótica inteligente con sensores de mapeo, programación horaria y gran autonomía de batería.",
        "images": ["cleanbot1.jpg", "cleanbot2.jpg", "cleanbot3.jpg", "cleanbot4.jpg", "cleanbot5.webp"]
    },
    {
        "name": "Silla ergonómica ErgoChair Plus",
        "description": "Silla de oficina ergonómica con soporte lumbar ajustable, reposacabezas y tapizado transpirable para largas jornadas de trabajo.",
        "images": ["ergochair1.jpg", "ergochair2.webp", "ergochair3.jpg", "ergochair4.webp", "ergochair5.avif"]
    },
    {
        "name": "Pulsera fitness ActiveBand",
        "description": "Pulsera de actividad con seguimiento de pasos, calorías, ritmo cardíaco y notificaciones inteligentes.",
        "images": ["activeband1.jpeg", "activeband2.jpeg", "activeband3.jpeg", "activeband4.jpeg", "activeband5.jpg"]
    },
    {
        "name": "Impresora multifunción PrintPro",
        "description": "Impresora multifunción con escaneo y copiado, conexión Wi-Fi y compatibilidad con impresión desde dispositivos móviles.",
        "images": ["printpro1.jpg", "printpro2.jpg", "printpro3.jpeg", "printpro4.jpg", "printpro5.jpg"]
    },
    {
        "name": "Juego de sartenes ChefCook 3 piezas",
        "description": "Set de sartenes antiadherentes de distintos tamaños, aptas para cocinas de gas y eléctricas.",
        "images": ["chefcook1.avif", "chefcook2.webp", "chefcook3.jpg", "chefcook4.webp", "chefcook5.jpg"]
    },
    {
        "name": "Gafas de sol PolarVision",
        "description": "Lentes de sol con filtro UV400 y diseño deportivo, ideales para protección en actividades al aire libre.",
        "images": ["polarvision1.webp", "polarvision2.jpg", "polarvision3.jpg", "polarvision4.jpg", "polarvision5.jpg"]
    },
    {
        "name": "Plancha a vapor SteamEase",
        "description": "Plancha de ropa con sistema de vapor vertical, suela de cerámica y apagado automático para mayor seguridad.",
        "images": ["steamease1.jpg", "steamease2.png", "steamease3.png", "steamease4.webp", "steamease5.webp"]
    },
    {
        "name": "Set de maletas TravelPro",
        "description": "Juego de dos maletas rígidas con ruedas giratorias y cierre seguro, perfectas para viajes cortos y largos.",
        "images": ["travelpro1.webp", "travelpro2.jpg", "travelpro3.webp", "travelpro4.jpg", "travelpro5.jpg"]
    },
    {
        "name": "Altavoz inteligente SmartSound Mini",
        "description": "Parlante inteligente compatible con asistentes virtuales, control por voz y excelente calidad de sonido en tamaño compacto.",
        "images": ["smartsound1.jpg", "smartsound2.jpg", "smartsound3.png", "smartsound4.jpg", "smartsound5.webp"]
    }
]

for product in PRODUCTS:
    files = []
    for img in product["images"]:
        mime_type, _ = mimetypes.guess_type(img)
        files.append(("images", (img, open(f"/Users/chiarabosio/Documents/productos/{img}", "rb"), mime_type or "application/octet-stream")))
    data = {
        "name": product["name"],
        "description": product["description"]
    }
    response = requests.post(API_URL, data=data, files=files)
    print(f"{product['name']}: {response.status_code} - {response.text}") 