import { Breakpoints, Color, Palette, PaletteColor, TypeBackground } from "@mui/material"
import { Shape } from "@mui/system"

export interface ItemSidebarProps {
    title: string;
    path: string;
    icon: JSX.Element;
    children?: ItemSidebarProps[];
    info?: string;
}

export interface PaletteColorInterface extends PaletteColor {
    lighter: string;
    darker: string;
}

export interface PaletteGradientsInterface {
    primary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
}

export interface PaletteBackgroundInterface extends TypeBackground {
    neutral: string
}

export interface PaletteGreyInterface extends Color {
    0: string;
    5008: string;
    50012: string;
    50016: string;
    50024: string;
    50032: string;
    50048: string;
    50056: string;
    50080: string;
}

export interface CustomPaletteInterface extends Palette {
    primary: PaletteColorInterface
    secondary: PaletteColorInterface
    info: PaletteColorInterface
    success: PaletteColorInterface
    warning: PaletteColorInterface
    error: PaletteColorInterface
    grey: PaletteGreyInterface
    gradients: PaletteGradientsInterface
    divider: string,
    background: PaletteBackgroundInterface
}

interface BreakpointValueInterface {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export interface BreakpointsInterface extends Breakpoints {
    values: BreakpointValueInterface
}

export interface ShapeInterface extends Shape {
    borderRadiusSm: number;
    borderRadiusMd: number;
}

export interface CustomShadowsInterface {
    z1: string;
    z4: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    card: string;
    dialog: string;
    dropdown: string;
}

export interface DataBaseProps {
    created_at: Date
    updated_at: Date
}

export type IdType = number | string;

export interface EntityInterface extends DataBaseProps {
    id: IdType
}

export enum typeEquipment {
    'All in one' = 'Todo en uno',
    'Desktop' = 'Escritorio',
    'Laptop' = 'Laptop',
    'Workstation' = 'Estación de trabajo',
    'Tablet iOS' = 'Tablet iOS',
}

export interface BrandInterface extends EntityInterface {
    id: IdType
    name: string
}

export interface TableDataInterface<T> {
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
}

export type GetComparatorOrderType = 'asc' | 'desc';

export interface UpdateInterface<T> {
    initData: T,
    setData: React.Dispatch<React.SetStateAction<T[] | []>>
}

export interface UserProps {
    username: string,
    cc: string,
    phone: string | null
}

export interface UserInterface extends EntityInterface, UserProps { }

export type ColorThemeType = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export interface ProviderProps {
    children: React.ReactNode
}

export type StateMessage = JSX.Element | null;

export interface HeadLabelInterface<T> {
    id: keyof T,
    label: string,
    alignRight?: boolean,
    padding?: "checkbox" | "none" | "normal",
}

export interface MaintenanceBaseProps {
    date: string
    workstation: string
    city: string
    end_error_description: string
    Q1: string
    Q2: string
    Q3: string
    observations: string
}

export interface MaintenanceInitValueProps extends MaintenanceBaseProps {
    equipment_id: string
    ignition_station: boolean
    operating_system_boot: boolean
    HDD: boolean
    CD_rom_DVD: boolean
    display: boolean
    mouse: boolean
    keyboard: boolean
    remove_indoor_dust: boolean
    check_internal_connections: boolean
    clean_keyboard: boolean
    clean_monitor: boolean
    clean_mouse: boolean
    connect_power_peripheral_cables: boolean
    close_PC_clean_case: boolean
    end_ignition_station: boolean
    end_operating_system_boot: boolean
    end_HDD: boolean
    end_CD_rom_DVD: boolean
    end_display: boolean
    end_mouse: boolean
    end_keyboard: boolean
    error_description: string
    check_anti_virus: boolean
    deletion_temporary_cookies: boolean
    disk_defragmentation: boolean
    equipment_delivery: boolean
}

export interface MaintenanceProps extends MaintenanceBaseProps, MaintenanceInitValueProps {
    signature: Blob
}

export type BooleanTypeApi = 1 | 0

export interface MaintenanceInterface extends EntityInterface, MaintenanceBaseProps {
    ignition_station: BooleanTypeApi | null
    operating_system_boot: BooleanTypeApi | null
    HDD: BooleanTypeApi | null
    CD_rom_DVD: BooleanTypeApi | null
    display: BooleanTypeApi | null
    mouse: BooleanTypeApi | null
    keyboard: BooleanTypeApi | null
    remove_indoor_dust: BooleanTypeApi | null
    check_internal_connections: BooleanTypeApi | null
    clean_keyboard: BooleanTypeApi | null
    clean_monitor: BooleanTypeApi | null
    clean_mouse: BooleanTypeApi | null
    connect_power_peripheral_cables: BooleanTypeApi | null
    close_PC_clean_case: BooleanTypeApi | null
    end_ignition_station: BooleanTypeApi | null
    end_operating_system_boot: BooleanTypeApi | null
    end_HDD: BooleanTypeApi | null
    end_CD_rom_DVD: BooleanTypeApi | null
    end_display: BooleanTypeApi | null
    end_mouse: BooleanTypeApi | null
    end_keyboard: BooleanTypeApi | null
    error_description: string
    check_anti_virus: BooleanTypeApi | null
    deletion_temporary_cookies: BooleanTypeApi | null
    disk_defragmentation: BooleanTypeApi | null
    equipment_delivery: BooleanTypeApi | null
    signature: string
    user: UserInterface
}

export interface SupportInterface extends EntityInterface {
    username: string
}

export interface SupportProps {
    username: string
    password: string
}

export interface BrandInterface extends EntityInterface {
    name: string
}

export interface BrandStateInterface {
    brands: BrandInterface[]
    setBrands: React.Dispatch<React.SetStateAction<BrandInterface[]>>
}

export interface BarCharData {
    name: string;
    type: string;
    fill: string;
    data: number[];
}
