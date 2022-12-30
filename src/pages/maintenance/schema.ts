import { MaintenanceInitValueProps } from 'interfaces'
import { number, object, string, date, boolean } from 'yup'

export const maintenanceSchema = object().shape({
    equipment_user_id: number()
        .required('El usuario es requerido.'),
    equipment_id: number()
        .required('El equipo es requerido.'),
    date: date()
        .test('len', 'La fecha no puede ser mayor a la de hoy.', value => {
            if (value !== undefined) {
                const today = new Date()
                return value <= today;
            }

            return true;
        })
        .required('La fecha del mantenimiento es requerida.'),
    city: string()
        .required('La ciudad es requerida.'),
    campus: string()
        .required('La sede es requerida.'),
    workstation: string(),
    ignition_station: boolean(),
    operating_system_boot: boolean(),
    HDD: boolean(),
    CD_rom_DVD: boolean(),
    display: boolean(),
    mouse: boolean(),
    keyboard: boolean(),
    remove_indoor_dust: boolean(),
    check_internal_connections: boolean(),
    clean_keyboard: boolean(),
    clean_monitor: boolean(),
    clean_mouse: boolean(),
    connect_power_peripheral_cables: boolean(),
    close_PC_clean_case: boolean(),
    end_ignition_station: boolean(),
    end_operating_system_boot: boolean(),
    end_HDD: boolean(),
    end_CD_rom_DVD: boolean(),
    end_display: boolean(),
    end_mouse: boolean(),
    end_keyboard: boolean(),
    error_description: string(),
    check_anti_virus: boolean(),
    deletion_temporary_cookies: boolean(),
    disk_defragmentation: boolean(),
    equipment_delivery: boolean(),
    end_error_description: string(),
    Q1: string(),
    Q2: string(),
    Q3: string(),
    observations: string(),
})
export const maintenanceInitialValues: MaintenanceInitValueProps = {
    equipment_user_id: '',
    equipment_id: '',
    date: '',
    workstation: '',
    city: '',
    campus: '',
    ignition_station: false,
    operating_system_boot: false,
    HDD: false,
    CD_rom_DVD: false,
    display: false,
    mouse: false,
    keyboard: false,
    remove_indoor_dust: false,
    check_internal_connections: false,
    clean_keyboard: false,
    clean_monitor: false,
    clean_mouse: false,
    connect_power_peripheral_cables: false,
    close_PC_clean_case: false,
    end_ignition_station: false,
    end_operating_system_boot: false,
    end_HDD: false,
    end_CD_rom_DVD: false,
    end_display: false,
    end_mouse: false,
    end_keyboard: false,
    error_description: '',
    check_anti_virus: false,
    deletion_temporary_cookies: false,
    disk_defragmentation: false,
    equipment_delivery: false,
    end_error_description: '',
    Q1: '',
    Q2: '',
    Q3: '',
    observations: '',
}
