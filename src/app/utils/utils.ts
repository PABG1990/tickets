class Utils {
  public getUserInfo() {
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === 'true') {
      const user = JSON.parse(sessionStorage.getItem('user') || '{}');
      return user;
    }
    return null;
  }

  public getAccessButtons(profile: string) {
    return {
      ADMINISTRADOR: {
        showAssign: true,
        showReschedule: true,
        showAddObservations: true,
      },
      TECNICO: {
        showAssign: false,
        showReschedule: true,
        showAddObservations: true,
      },
      CLIENTE: {
        showAssign: false,
        showReschedule: false,
        showAddObservations: false,
      }
    }[profile] || {
      showAssign: false,
      showReschedule: false,
      showAddObservations: true,
    };
  }

  public getCaseColor(caseStatus: string) {
    return {
      ABIERTO: '#3498db',
      AGENDADO: '#2ecc71',
      REAGENDADO: '#9b59b6',
      FINALIZADO: '#f1c40f',
      CANCELADO: '#e74c3c',
    }[caseStatus];
  }
}

const utils = new Utils();
export default utils;
