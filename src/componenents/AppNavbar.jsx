import { useLocation, Link } from "react-router-dom";
import './styles/Navbars.css';

export const AppNavbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

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

    return (
        <div className="minimalist-navbar">
            <div className="subitems-container">
                {currentSubItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`subitem ${currentPath === item.path ? 'active' : ''}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};