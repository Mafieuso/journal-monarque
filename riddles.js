/* Énigmes : les réponses sont stockées sous forme de hachage. Fichier généré. */

const STOP = new Set(['le','la','les','l','un','une','des','du','de','d','au','aux','et']);
function riddleNorm(s){
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/œ/g,'oe')
    .replace(/[^a-z0-9]+/g,' ').trim().split(' ').filter(w => w && !STOP.has(w)).join(' ');
}
function riddleHash(s){
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++){ const c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
const RIDDLES = {
 "I": {
  "q": "Une entité a fui devant moi, et ce jour a tout changé. Son nom est caché dans ce désordre : <b>S K H A R S E N</b>. Remets les lettres en ordre.",
  "hint": "Il est désormais à mon doigt, dans la Bague.",
  "h": [
   "12yr57zwt3f"
  ]
 },
 "II": {
  "q": "César n'est pas mort. Recule chaque lettre de trois rangs dans l'alphabet (E devient B) : <b>E L Z D</b>. C'est l'instrument de celle dont je porte le nom.",
  "hint": "Elle est surnommée la Dame au…",
  "h": [
   "1i9t9tzk0zq"
  ]
 },
 "III": {
  "q": "Une entité qui fuit te dit qu'elle sait ce que tu ignores. Les autres ont appelé cela une obsession. Moi, j'ai employé le mot d'un créancier. Quel mot ?",
  "hint": "Ce que l'on doit, et que l'on finit par régler.",
  "h": [
   "1v2kixo2izm"
  ]
 },
 "IV": {
  "q": "Pour toucher l'Occulte, il faut ressentir ce qui n'existe pas. Chiffre chaque lettre par sa place dans l'alphabet : <b>22 · 9 · 4 · 5</b>.",
  "hint": "A = 1, B = 2… Le contraire du plein.",
  "h": [
   "1za7h8zoh5a"
  ]
 },
 "V": {
  "q": "Cinq rangs, de l'Incantateur au Monarque. Écarte le premier et le dernier. Parmi les trois qui restent, lequel porte le nom le plus long, une fois les espaces et l'apostrophe retirés ? Donne son nom complet.",
  "hint": "Compte les lettres, une par une.",
  "h": [
   "ikj8dhrkhx"
  ]
 },
 "VI": {
  "q": "Bess Sedouki trouva deux sphères et absorba la première. La seconde, il la divisa en autant de fragments qu'il existe de rangs dans l'Occulte, moins un. J'en ai assimilé un. Combien en reste-t-il hors de ma portée ?",
  "hint": "Cinq rangs. Un de moins. Puis moi.",
  "h": [
   "czc8jzrpb7",
   "1un8jdjlav1"
  ]
 },
 "VII": {
  "q": "Lis ceci à l'envers : <b>N I O M É T</b>. Voilà ce que l'on devient, dans la Mémoire, au lieu de régner.",
  "hint": "Commence par la dernière lettre.",
  "h": [
   "vv1c4nbjtk"
  ]
 },
 "VIII": {
  "q": "Notre monde, le Néant, les Limbes : trois étages. Au-delà du dernier, une porte cachée mène à un quatrième lieu. Donne le nom de ce lieu, puis celui du démon, ancienne Lune Supérieure, que je voulais y ressusciter.",
  "hint": "Deux mots. Le lieu d'abord.",
  "h": [
   "1b12s0xi55d"
  ]
 },
 "IX": {
  "q": "Il y avait sept Gardiens. Athanos, l'un d'eux, en dévora deux et s'allia à deux autres. Compte ceux qui n'ont été ni dévorés ni ralliés (Athanos exclu). Multiplie ce nombre par celui des Gardiens que je montre scellés dans la Bague.",
  "hint": "Sept, moins Athanos, moins deux, moins deux. Puis les fiches que tu as pu déplier.",
  "h": [
   "2artas3j1to",
   "1jzbwy80yqr"
  ]
 },
 "X": {
  "q": "Atbash : l'alphabet lu à rebours (A devient Z, B devient Y…). Déchiffre <b>Y Z O R H V</b> : ce que la Bague est, en plus d'être une prison.",
  "hint": "Un signal que l'on ne peut éteindre.",
  "h": [
   "1ftu65zknff"
  ]
 },
 "XI": {
  "q": "Dans mon jeu, la Sphère entière est faite de pièces que l'on sacrifie sans mépris. Donne d'abord le nom de ces pièces (un mot, au pluriel, celui du plus petit soldat d'un échiquier), puis le nom de celui qui n'en est pas une.",
  "hint": "Deux mots. Le second est celui à qui je parle.",
  "h": [
   "17zh64ew1x2",
   "1nke95v4qf4"
  ]
 },
 "XII": {
  "q": "Celui qui a tissé la Trame se tient dans un lieu où rien n'existe. À ses côtés, chaque créature vaut un certain nombre d'Athanos. Écris le lieu, puis cette quantité en un seul mot (pas un chiffre).",
  "hint": "Le lieu : le deuxième étage. La quantité : un pluriel de « cent ».",
  "h": [
   "27rgwk6n1pl",
   "24fmfumwor5"
  ]
 },
 "XIII": {
  "q": "Quand tous les cœurs se rompent au même instant, leurs déflagrations s'annulent. Il ne reste pas une explosion, mais un mot de dix lettres. Les consonnes ont disparu : <b>_ I _ _ O _ A _ _ E</b>.",
  "hint": "Un lieu où l'espace et le temps ne s'accordent plus.",
  "h": [
   "1xh5rydb43e"
  ]
 },
 "XIV": {
  "q": "Pour forger l'arme, il faut trois matières : un minerai que j'ai créé, les ruines de ma Bague, et un artéfact ancien qui offrit jadis sa puissance à Traya Hord. Nomme-le, puis dis en un mot ce qu'il exige de qui s'en sert (au singulier).",
  "hint": "Un artéfact creusé dans la terre. Ce qu'il exige est énorme.",
  "h": [
   "11c0ktt7d3t"
  ]
 },
 "final": {
  "q": "Dans ma liste de ce qui reste inachevé, le premier élément est la seule tâche qui compte vraiment. Donne son nom, puis le nombre total d'éléments de la liste (en chiffre ou en lettres).",
  "hint": "Compte chaque puce, sans en oublier.",
  "h": [
   "43yl14smvy",
   "53cc6g0hrl"
  ]
 }
};
const ANNEX_RIDDLES = {
 "hierarchies": {
  "q": "Les Excellences Suprêmes sont classées de 6 à 1. Celle qui m'a soutenu occupe un rang. Multiplie ce rang par le nombre de rangs de l'Occulte.",
  "hint": "Entrée IV : un numéro, puis une liste numérotée.",
  "h": [
   "13tj7w2i7c5",
   "3vael1vxem"
  ]
 },
 "personnages": {
  "q": "Deux Hord, hors moi, apparaissent dans mon journal. Donne leurs deux prénoms dans l'ordre où je les cite.",
  "hint": "Entrée I, puis entrée II.",
  "h": [
   "2783qy4zhi2"
  ]
 },
 "lieux": {
  "q": "Écris, dans l'ordre où je les ai numérotés, les trois étages du monde.",
  "hint": "Entrée VII. Sans les chiffres, ni les articles.",
  "h": [
   "zc1skslgw4"
  ]
 },
 "glossaire": {
  "q": "Dans mon glossaire, trois termes commencent par T. L'un est un vêtement. Les deux autres sont ce que le Créateur a tissé et ce que doit accomplir un Monarque. Donne ces deux-là, dans l'ordre alphabétique.",
  "hint": "Entrées IX, XI, III et XIII.",
  "h": [
   "u7b3wsqsdi",
   "1cub0jas6vy"
  ]
 },
 "chronologie": {
  "q": "Combien d'entrées numérotées en chiffres romains compte mon journal, sans le prologue ni le testament ?",
  "hint": "Du I au dernier chiffre romain.",
  "h": [
   "27mjljed7ff",
   "22razxm8hjn",
   "zmpbol01oq"
  ]
 }
};
function checkRiddle(set, id, input){ const r = set[id]; return !!r && r.h.includes(riddleHash(riddleNorm(input))); }
