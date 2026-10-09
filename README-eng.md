# Anenji / Aninerel 4200: Local Inverter Integration for Home Assistant via ESPHome + Modbus

## 🌟 Project Overview

**invertor-Anenji-Aninerel4200-esphome-local** is a project for **local integration** of an Anenji / Aninerel 4200 W inverter into Home Assistant **directly over Modbus RTU**, without cloud services or the manufacturer's stock Wi-Fi module.

The inverter is connected to an ESP32-C3 via UART at 9600 baud. ESPHome polls Modbus registers and publishes data to Home Assistant through the native API. Everything runs **fully locally**, with no external servers involved.

The project allows you to:

- monitor inverter state in real time: voltage, current, power, frequency, temperature, battery SOC;
- read and decode fault and warning codes into human-readable text;
- control inverter operating modes and battery settings directly from Home Assistant;
- track PV energy and grid import with daily reset;
- use the built-in ESPHome web interface for diagnostics.

## 🔑 Key Features

### 📊 Real-Time Telemetry

- **Grid input:** voltage, frequency, average power.
- **Inverter output:** effective voltage, current, frequency, active and apparent power.
- **Battery:** average voltage, current, power, SOC, charge/discharge current.
- **PV (solar):** average voltage, current, power, PV charging power.
- **Inverter:** frequency, average power, charging power, DCDC and inverter temperature.
- **Load:** load percentage, rated power.

### ⚡ Energy Monitoring

- **PV energy today** — solar energy for the current day (reset at midnight).
- **PV energy total** — cumulative PV energy since installation (never resets).
- **Grid import energy today** — energy drawn from the grid today.
- **Inverter total consumption today** — total load consumption today.
- **Manual correction** of the PV total counter via a dedicated setting.

All counters are calculated on the ESPHome side via an `interval` block with a fixed 10-second step. Daily counters are reset **simultaneously**, using a shared global `energy_day` in `YYYYMMDD` format.

### 🚨 Diagnostics

- **Fault** — decoding of 27 fault codes (over-temperature, overload, short circuit, bus undervoltage, etc.).
- **Warning** — decoding of 19 warnings (grid undervoltage, low battery, fan blocked, etc.).
- **Operation mode** — current mode: Power On, Standby, Mains, Off-Grid, Bypass, Charging, Fault.
- **Exit fault state** button to clear the fault condition.

### ⚙️ Settings Management

All key inverter parameters are exposed as Home Assistant entities:

- **Operating modes:** Output mode, Output priority, Input voltage range, Battery type.
- **Battery settings:** protection voltages, Bulk/CV, Float, Equalization, max charge currents.
- **SOC thresholds:** back to utility, back to battery, Low DC cut-off.
- **Service options:** buzzer, LCD backlight, energy-saving mode, auto-restart.
- **Polling intervals:** separate for telemetry and settings.

## 🛠 Hardware and Components

### Main Components

- **Microcontroller:** ESP32-C3 (IDF framework).
- **Interface converter:** TTL ↔ RS485 (e.g., MAX485 or equivalent).
- **Inverter:** Anenji / Aninerel 4200 W (Modbus RTU protocol, address `0x01`).

### Software Dependencies

- **ESPHome:** current version with `modbus_controller` support.
- **Home Assistant:** integration via native API.
- **ESPHome components:** `uart`, `modbus`, `modbus_controller`, `template`, `total_daily_energy`.

## 📋 Installation and Setup

### 1. Hardware Preparation

- Connect the RS485 module to ESP32-C3 pins: `GPIO21` (TX), `GPIO20` (RX).
- Connect RS485 lines A/B to the corresponding inverter terminals.
- Make sure the inverter's Modbus address is `0x01` and the baud rate is `9600`.

### 2. ESPHome Configuration

Open `aninerel-4200-invertor.yaml` and adjust the substitutions:

```yaml
substitutions:
  name: "aninerel4200"
  friendly_name: "Aninerel4200"
  tx_pin: GPIO21
  rx_pin: GPIO20
  device_ip: 192.168.0.116
  version: "05.10.2026"
  reboot_timeout: 0s
  flash_write_interval: 10min
```

### 3. Included Components

```yaml
<<: !include attach/common/esphome.yaml
<<: !include attach/common/esp/esp32_c3_idf.yaml
<<: !include attach/common/logger/debug_component_error.yaml
<<: !include attach/common/api.yaml
<<: !include attach/common/ota.yaml
<<: !include attach/common/wifi.yaml
<<: !include attach/common/web/web_server3.yaml
packages:
  common: !include attach/packages/standart.yaml
```

### 4. Home Assistant Integration

- Build and flash the ESP32-C3.
- The device will appear automatically in Home Assistant via the ESPHome integration.
- All sensors, `select`, `number`, `switch`, `button`, and `text_sensor` entities will be available.

## 🎮 Usage

### Web Interface

- Access via the device's IP address (requires the `web_server` component).
- View all sensors and logs in real time.

### Home Assistant

- **Dashboard:** cards with power, voltage, SOC, and inverter state.
- **Automations:** notifications on mode changes, faults, low SOC.
- **Energy dashboard:** ready-to-use sensors for HA's Energy Dashboard.

### How Energy Monitoring Works

1. **Every 10 seconds** ESPHome recalculates the energy increment:
   - for PV: `W × 10 / 3600 / 1000 = kWh`;
   - for grid: `W × 10 / 3600 / 1000 = kWh`.
2. **At day change** (according to Home Assistant time), both daily counters reset simultaneously.
3. **The PV total counter** keeps growing and never resets.
4. **Load consumption** is calculated by the `total_daily_energy` platform with a negative-value filter.

## 📊 Sensors and Entities

### Main Sensors (Examples)

| Entity | Description |
|---|---|
| `sensor.pv_energy_today` | PV energy today, kWh |
| `sensor.pv_energy_total` | PV energy total, kWh |
| `sensor.grid_import_energy_today` | Grid import today, kWh |
| `sensor.inverter_total_consumption_today` | Load consumption today, kWh |
| `sensor.battery_state_of_charge` | Battery SOC, % |
| `sensor.battery_average_power` | Battery power (+ charge / − discharge), W |
| `sensor.pv_average_power` | PV power, W |
| `sensor.output_active_power` | Load active power, W |
| `sensor.average_mains_power` | Grid import power, W |
| `sensor.inverter_temperature` | Inverter temperature, °C |
| `text_sensor.fault` | Decoded fault codes |
| `text_sensor.warning` | Decoded warnings |
| `text_sensor.operation_mode` | Inverter operating mode |

### Controls (Examples)

| Entity | Description |
|---|---|
| `select.output_priority` | Source priority (UTI / SOL / SBU / SUB) |
| `select.battery_type` | Battery type (AGM / FLD / USER / Li1–Li4 / Lib) |
| `number.max_charging_voltage` | Bulk/CV voltage, V |
| `number.maximum_charging_current` | Max charge current, A |
| `number.soc_point_back_to_utility` | SOC to switch back to grid, % |
| `switch.remote_switch` | Remote on/off |
| `button.exit_fault_state` | Clear fault state |

## 🙏 Acknowledgements

- **The ESPHome community** for the framework and the `modbus_controller` component.
- **Home Assistant** for the integration and energy monitoring.
- **@psalkiewicz** — for the base YAML code, register maps, and inspiration.
- **You** for using this project! If it's useful, please ⭐ it on GitHub.

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details. Use at your own risk: working with inverters and batteries requires caution.

## Additional Resources

- Telegram channel: [https://t.me/parus_smart](https://t.me/parus_smart)
- MAX channel: [https://max.ru/channel_parus_smart](https://max.ru/channel_parus_smart)
