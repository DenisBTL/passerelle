// Le nom du projet se remplace ici, sans modifier les composants.
export const project = {
  name: "Mise en commun",
  baseline: "Les solutions connectées de la vigne à la vente",
};

export const navigation = [
  { id: "project", label: "Le projet" },
  { id: "journey", label: "Parcours" },
  { id: "idea", label: "Déposer une idée" },
  { id: "solutions", label: "Solutions" },
  { id: "contact", label: "Contact" },
];

export const stages = [
  {
    id: "parcelles",
    label: "Parcelles",
    description:
      "Relier les observations de terrain et les interventions à l’histoire de chaque parcelle.",
  },
  {
    id: "vendanges",
    label: "Vendanges",
    description:
      "Faire le lien entre les apports, les pesées et les lots qui entrent au chai.",
  },
  {
    id: "cuverie",
    label: "Cuverie",
    description:
      "Partager les analyses, les mouvements et le suivi de vinification.",
  },
  {
    id: "mises",
    label: "Mises",
    description:
      "Connecter les ordres de mise, les matières sèches et les lots conditionnés.",
  },
  {
    id: "stocks",
    label: "Stocks",
    description:
      "Retrouver des disponibilités cohérentes entre le chai et les canaux de vente.",
  },
  {
    id: "ventes",
    label: "Ventes",
    description:
      "Relier les commandes, la facturation et les expéditions sans ressaisie.",
  },
  {
    id: "clients",
    label: "Clients",
    description:
      "Rassembler les préférences et l’historique pour mieux connaître chaque client.",
  },
  {
    id: "administratif",
    label: "Administratif",
    description:
      "Réutiliser les données métier pour préparer les documents et les déclarations.",
  },
  {
    id: "fidelisation",
    label: "Après-vente / Fidélisation",
    icon: "tableaux-de-bord",
    description:
      "Prolonger la relation après la vente avec un suivi et des attentions personnalisés.",
  },
];

export const solutions = [
  {
    id: "trace",
    title: "Traçabilité & engagement",
    icon: "bottle",
    color: "green",
    category: "production",
    stage: "parcelles",
    description:
      "Reliez chaque bouteille à son histoire, de la parcelle à la dégustation.",
    flow: "Traçabilité des lots, mouvements de stock & scans",
    detail:
      "Une connexion entre les interventions à la vigne, les lots du chai et une fiche de traçabilité permettrait de partager l’origine et le parcours d’un vin. Chaque information serait saisie à sa source, puis réutilisée là où elle est utile.",
    exchanges: [
      "Identifiants des parcelles et des lots",
      "Origine et étapes de production",
      "Informations accessibles à la dégustation",
    ],
  },
  {
    id: "export",
    title: "Informations légales & export",
    icon: "document",
    color: "blue",
    category: "administration",
    stage: "administratif",
    description:
      "Préparez vos documents et déclarations pour exporter dans le monde.",
    flow: "Documents export, déclarations douanières",
    detail:
      "Les informations du produit et de la commande pourraient alimenter la préparation des documents d’export. L’objectif : limiter les doubles saisies et garder des données cohérentes, avec une validation humaine avant toute déclaration.",
    exchanges: [
      "Caractéristiques des vins",
      "Destinations et données de commande",
      "Documents et statuts de validation",
    ],
  },
  {
    id: "box",
    title: "Box & échantillons",
    icon: "gift",
    color: "pink",
    category: "commerce",
    stage: "clients",
    description:
      "Créez et envoyez des box de dégustation à vos prospects et acheteurs.",
    flow: "Données clients, préférences & historique d’envois",
    detail:
      "Le fichier clients pourrait dialoguer avec un service de préparation de coffrets. Les échantillons envoyés et les retours de dégustation rejoindraient ensuite l’historique de la relation commerciale.",
    exchanges: [
      "Coordonnées et préférences",
      "Sélection de vins et quantités",
      "Historique des envois et retours",
    ],
  },
  {
    id: "chr",
    title: "Appels d’offres CHR",
    icon: "cloche",
    color: "purple",
    category: "commerce",
    stage: "ventes",
    description: "Répondez aux besoins des restaurants, hôtels et bars.",
    flow: "Appels d’offres & opportunités",
    detail:
      "Les disponibilités et les fiches de vins pourraient être rapprochées des besoins des cafés, hôtels et restaurants. Les équipes commerciales retrouveraient les opportunités pertinentes dans leur outil habituel.",
    exchanges: [
      "Fiches de vins et disponibilités",
      "Critères et volumes recherchés",
      "Opportunités et réponses commerciales",
    ],
  },
  {
    id: "ai",
    title: "Brique IA inbound / outbound",
    icon: "sparkles",
    color: "blue",
    category: "commerce",
    stage: "clients",
    description: "Fluidifiez vos échanges et enrichissez vos données métier.",
    flow: "Données ventes & clients enrichies par l’IA",
    detail:
      "Un assistant pourrait préparer une synthèse des échanges, aider à qualifier une demande ou proposer un suivi commercial à partir de données autorisées. L’utilisateur garderait la main sur les informations et les messages à envoyer.",
    exchanges: [
      "Demandes entrantes",
      "Contexte commercial autorisé",
      "Suggestions à valider par l’équipe",
    ],
  },
  {
    id: "logistics",
    title: "Logistique & expédition",
    icon: "truck",
    color: "orange",
    category: "production",
    stage: "stocks",
    description: "Expédiez vos vins simplement et suivez chaque livraison.",
    flow: "Stocks, commandes & suivi des expéditions",
    detail:
      "Une commande validée pourrait déclencher la préparation d’un colis, puis recevoir automatiquement son numéro de suivi. Les mouvements de stock et les informations de livraison resteraient reliés à la vente.",
    exchanges: [
      "Commandes et adresses de livraison",
      "Colis et mouvements de stock",
      "Suivi et confirmation de livraison",
    ],
  },
  {
    id: "tax",
    title: "Accises & fiscalité",
    icon: "euro",
    color: "gold",
    category: "administration",
    stage: "administratif",
    description:
      "Facilitez le suivi des accises selon les pays de destination.",
    flow: "Données fiscales & déclarations",
    detail:
      "Les volumes, les mouvements et les destinations pourraient être regroupés pour préparer les éléments déclaratifs. Une étape de contrôle resterait nécessaire pour valider les données et les règles applicables.",
    exchanges: [
      "Volumes et catégories de produits",
      "Mouvements et destinations",
      "Éléments de préparation des déclarations",
    ],
  },
];

// Projets fictifs du prototype. Remplacer ces données par les projets réels
// avant publication : aucun de ces statuts ne décrit une intégration active.
export const ongoingProjects = [
  {
    id: "lot-bouteille",
    solutionId: "trace",
    title: "Du lot à la bouteille",
    stageIds: ["parcelles", "vendanges", "cuverie", "mises"],
    status: "En conception",
    description:
      "Relier les parcelles, les apports et les lots pour suivre l’histoire de chaque bouteille.",
  },
  {
    id: "documents-export",
    solutionId: "export",
    title: "Les documents export sans ressaisie",
    stageIds: ["mises", "administratif"],
    status: "À l’étude",
    description:
      "Réutiliser les caractéristiques du vin pour préparer les fiches produit et les documents d’export.",
  },
  {
    id: "coffrets-clients",
    solutionId: "box",
    title: "Des dégustations qui créent du lien",
    stageIds: ["clients", "fidelisation"],
    status: "En conception",
    description:
      "Associer les coffrets envoyés, les préférences et les retours de dégustation au suivi client.",
  },
  {
    id: "opportunites-chr",
    solutionId: "chr",
    title: "Les vins disponibles, les bons acheteurs",
    stageIds: ["stocks", "ventes"],
    status: "À l’étude",
    description:
      "Rapprocher les disponibilités du domaine des besoins des restaurants, hôtels et bars.",
  },
  {
    id: "assistant-commercial",
    solutionId: "ai",
    title: "Un suivi commercial mieux informé",
    stageIds: ["ventes", "clients", "fidelisation"],
    status: "À l’étude",
    description:
      "Préparer des suggestions de suivi à partir des échanges clients, à valider par l’équipe.",
  },
  {
    id: "commande-livraison",
    solutionId: "logistics",
    title: "De la commande à la livraison",
    stageIds: ["stocks", "ventes"],
    status: "En conception",
    description:
      "Connecter les commandes, les mouvements de stock et le suivi des expéditions.",
  },
  {
    id: "preparation-accises",
    solutionId: "tax",
    title: "Des déclarations mieux préparées",
    stageIds: ["administratif"],
    status: "À l’étude",
    description:
      "Rassembler les volumes et les destinations pour faciliter la préparation des déclarations.",
  },
];

export const howItWorks = [
  {
    icon: "search",
    title: "Identifiez votre besoin",
    description:
      "Repérez l’étape concernée et exprimez votre besoin ou votre idée de connexion.",
  },
  {
    icon: "link",
    title: "Connectez les bonnes solutions",
    description:
      "Nous facilitons la mise en relation entre les briques utiles selon votre usage.",
  },
  {
    icon: "chart",
    title: "Faites circuler la donnée",
    description:
      "Les outils se connectent, les données circulent, vous gagnez en fluidité.",
  },
];

export const useCases = [
  {
    id: "export",
    title: "De la parcelle à l’export",
    image: "vineyard.webp",
    description:
      "Une même donnée accompagne le vin, du domaine à sa destination.",
    stage: "administratif",
    problem:
      "Les informations d’un même vin sont recopiées dans le suivi de production, les fiches produit et les documents d’export.",
    connection:
      "Relier le suivi des lots aux fiches produit, puis à la préparation des documents export.",
    benefit: "Moins de ressaisies et une histoire du vin plus facile à suivre.",
  },
  {
    id: "sales",
    title: "Des ventes plus efficaces",
    image: "ventes-clients.jpg",
    description: "Commandes, stocks et expéditions se parlent enfin.",
    stage: "ventes",
    problem:
      "Une commande est enregistrée dans un outil, puis ressaisie pour organiser la préparation et la livraison.",
    connection:
      "Transmettre la commande validée à la gestion de stock et récupérer le suivi d’expédition dans l’outil commercial.",
    benefit:
      "Une équipe mieux informée et des clients qui peuvent suivre leur commande.",
  },
  {
    id: "loyalty",
    title: "Fidéliser ses clients",
    image: "oenotourisme.jpg",
    description: "Des attentions personnalisées pour une relation qui dure.",
    stage: "fidelisation",
    problem:
      "Les préférences recueillies au caveau se perdent et ne servent pas lors du prochain échange.",
    connection:
      "Rapprocher les retours de dégustation, les achats et les envois d’échantillons dans le suivi client.",
    benefit:
      "Des propositions plus pertinentes et une relation suivie dans le temps.",
  },
];
