import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";

export const AppNavbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const carouselRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [maxVisibleItems, setMaxVisibleItems] = useState(5);

    // Atualiza o número máximo de itens visíveis com base no tamanho da tela
    useEffect(() => {
        const updateMaxVisibleItems = () => {
            const width = window.innerWidth;
            if (width > 1200) {
                setMaxVisibleItems(7);
            } else if (width > 900) {
                setMaxVisibleItems(5);
            } else if (width > 600) {
                setMaxVisibleItems(4);
            } else {
                setMaxVisibleItems(3);
            }
        };

        updateMaxVisibleItems();
        window.addEventListener("resize", updateMaxVisibleItems);
        return () => window.removeEventListener("resize", updateMaxVisibleItems);
    }, []);

    // Verifica a posição do scroll do carrossel
    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
    };

    // Efeito para verificar a posição inicial
    useEffect(() => {
        checkScrollPosition();
    }, [currentPath, maxVisibleItems]);

    const allSubItems = {
        informacoes: [
            { path: "/informacoes/empresa", label: "Empresa" },
            { path: "/informacoes/socios", label: "Sócios" },
            { path: "/informacoes/departamentos", label: "Departamentos" },
            { path: "/informacoes/equipe", label: "Equipes" }
        ],
        modelagem: [
            { path: "/modelagem/canvas", label: "Canvas" },
            { path: "/modelagem/curva-de-valor", label: "Curva de Valor" }
        ],
        estrategia: [
            { path: "/estrategia/diretrizes", label: "Diretrizes" },
            { path: "/estrategia/forcas", label: "Forças" },
            { path: "/estrategia/swot", label: "SWOT" },
            { path: "/estrategia/metas", label: "Metas" },
            { path: "/estrategia/acoes", label: "Ações" }
        ],
        marketing: [
            { path: "/marketing/produto", label: "Produto" },
            { path: "/marketing/preco", label: "Preço" },
            { path: "/marketing/praca", label: "Praça" },
            { path: "/marketing/promocao", label: "Promoção" },
            { path: "/marketing/mercado", label: "Mercado" }
        ],
        preco: [
            { path: "/preco/precificacao", label: "Precificação" },
            { path: "/preco/custos", label: "Custos" },
            { path: "/preco/homem-hora", label: "Homem Hora" }
        ],
        financas: [
            { path: "/financas/balanco", label: "Balanço" },
            { path: "/financas/fluxo", label: "Fluxo de Caixa" }
        ]
    };

    const currentSubItems = Object.entries(allSubItems).find(([key]) =>
        currentPath.startsWith(`/${key}`)
    )?.[1] || [];

    if (currentSubItems.length === 0 || currentPath === '/') {
        return null;
    }

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            carouselRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            setTimeout(checkScrollPosition, 300);
        }
    };

    return (
        <nav
            style={{
                background: "#f8f9fa",
                padding: "10px 0",
                position: "relative",
                borderBottom: "1px solid #dee2e6",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%"
            }}
        >
            {showLeftArrow && (
                <IconButton
                    onClick={() => scroll('left')}
                    style={{
                        position: "absolute",
                        left: "10px",
                        zIndex: 1,
                        background: "rgba(255, 255, 255, 0.7)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                >
                    <ChevronLeft />
                </IconButton>
            )}

            <div
                ref={carouselRef}
                style={{
                    display: "flex",
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    gap: "8px",
                    padding: "0 40px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    maxWidth: isMobile ? "100%" : `${maxVisibleItems * 160}px`,
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    justifyContent: isMobile ? "flex-start" : "center"
                }}
                onScroll={checkScrollPosition}
            >
                {currentSubItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "20px",
                            textDecoration: "none",
                            background: currentPath === item.path ? "#343a40" : "#e9ecef",
                            color: currentPath === item.path ? "#fff" : "#495057",
                            fontWeight: currentPath === item.path ? "600" : "500",
                            transition: "all 0.2s ease",
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            border: currentPath === item.path ? "1px solid #343a40" : "1px solid #dee2e6",
                            minWidth: "120px",
                            textAlign: "center"
                        }}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {showRightArrow && (
                <IconButton
                    onClick={() => scroll('right')}
                    style={{
                        position: "absolute",
                        right: "10px",
                        zIndex: 1,
                        background: "rgba(255, 255, 255, 0.7)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                >
                    <ChevronRight />
                </IconButton>
            )}

            <style>
                {`
                a:hover {
                    background: #495057 !important;
                    color: #fff !important;
                    transform: scale(1.05);
                }
                `}
            </style>
        </nav>
    );
};