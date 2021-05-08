import { jsonFetch } from '../functions/api.js';

/**
 * Bouton pour appeler une URL avec la méthode DELETE et masquer le parent en cas de retour
 */
export class AjaxDelete extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', async (e) => {
      e.preventDefault();

      if (this.getAttribute('noconfirm') === null && !confirm('Voulez vous vraiment effectuer cette action ?')) {
        return;
      }

      // On affiche le loader
      const target = this.getAttribute('target');
      const parent = this.parentNode.parentNode.parentNode.parentNode;
      parent.style.position = 'relative';

      // On fait l'appel
      try {
        await jsonFetch(this.getAttribute('url'), { method: 'DELETE' });
        parent.remove();
      } catch (e) {
        console.log(e);
      }
    });
  }
}
