import { IconifyIcon } from "@iconify/react"
import { Breakpoints, Color, Palette, PaletteColor, TypeBackground } from "@mui/material"
import { Shape } from "@mui/system"
import { FieldInputProps } from "formik"
import { Dispatch, InputHTMLAttributes, MouseEventHandler, ReactNode, SetStateAction } from "react"

export interface SidebarButtonProps {
    tag: string
    icon: JSX.Element
    route: string
}

export interface ShowMenuStateInterface {
    showMenuState: boolean
    setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SidebarProps extends ShowMenuStateInterface {
    className?: string
}

export type InputFormikAttributes = FieldInputProps<any> & InputHTMLAttributes<HTMLInputElement>

export interface InputFormikProps extends InputFormikAttributes {
    error: boolean
}

export type ColorType = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

export interface ColorInterface {
    color: ColorType
}

export interface ItemSidebarProps {
    title: string;
    path: string;
    icon: JSX.Element;
    children?: ItemSidebarProps[];
    info?: string;
}

export type SidebarConfigInterface = ItemSidebarProps[] | []

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

export interface BreakpointsInterface extends Breakpoints {
    values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    }
}

export interface ShapeInterface extends Shape {
    borderRadiusSm: number;
    borderRadiusMd: number;
}

export interface CustomShadowsInterface {
    z1: string;
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
}

export interface TableOptionsInterface {
    label: string
    icon: IconifyIcon | string
    onClick: MouseEventHandler<HTMLAnchorElement>
}

export interface ResultApiInterface<T> {
    status: number
    message: string
    data?: T
}

export interface DataBaseProps {
    created_at: string
    updated_at: string
    deleted_at: string | null
}

export type IdType = number | string;

export interface EntityInterface extends DataBaseProps {
    id: IdType
}

export interface EquipmentProps {
    type: string,
    brand: string,
    model: string,
    serial: string,
    monitor_serial: string,
    license_plate: string,
    area: string,
    flat: string,
}

export interface EquipmentInterface extends EntityInterface, EquipmentProps { }

export type DataTableType<T> = T[] | [];

export interface TablePropsInterface<T> {
    id?: string
    createTableCells: (row: T) => JSX.Element
    headLabel: HeadLabelInterface[]
    data: DataTableType<T>
    selectBy: string
    searchBy: string
    placeholder?: string
}

export interface TableDataInterface<T> {
    data: DataTableType<T>
    setData: Dispatch<SetStateAction<DataTableType<T>>>
}

export type GetComparatorOrderType = 'asc' | 'desc';

export type StabilizedSortType<T> = [T, number];

export type AnyObject = { [key: string]: any };

export interface DescendingComparatorInterface {
    a: AnyObject,
    b: AnyObject,
    orderBy: string
}

export interface RegisterInterface<T> {
    setData: Dispatch<SetStateAction<T>>
}

export interface UpdateInterface<T> {
    initData: T,
    setData: Dispatch<SetStateAction<T[] | []>>
}


export interface UserProps {
    name: string,
    cc: string,
    phone: string
}

export interface UserInterface extends EntityInterface, UserProps { }

export type ColorThemeType = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export interface ProviderProps {
    children: ReactNode
}

export type StateMessage = JSX.Element | null;

export interface HeadLabelInterface {
    id: string,
    label: string,
    alignRight?: boolean,
    padding?: "checkbox" | "none" | "normal",
}

export interface MaintenanceProps {
    equipment_user_id: number
    equipment_id: number
    date: string
    workstation: string
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
    end_error_description: string
    Q1: string
    Q2: string
    Q3: string
    observations: string
}

export interface MaintenanceInterface extends EntityInterface, MaintenanceProps {
    equipment: EquipmentInterface
    equipment_user: UserInterface
}