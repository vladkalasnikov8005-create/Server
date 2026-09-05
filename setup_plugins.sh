#!/bin/bash
echo "Downloading Server JAR (Paper 1.20.4)..."
wget -O server.jar https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/496/downloads/paper-1.20.4-496.jar

mkdir -p plugins
cd plugins

echo "Downloading base plugins..."

# ViaVersion & ViaBackwards
wget -O ViaVersion.jar https://github.com/ViaVersion/ViaVersion/releases/latest/download/ViaVersion-4.9.2.jar
wget -O ViaBackwards.jar https://github.com/ViaVersion/ViaBackwards/releases/latest/download/ViaBackwards-4.9.2.jar

# EssentialsX suite
wget -O EssentialsX.jar https://github.com/EssentialsX/Essentials/releases/latest/download/EssentialsX-2.20.1.jar
wget -O EssentialsXChat.jar https://github.com/EssentialsX/Essentials/releases/latest/download/EssentialsXChat-2.20.1.jar
wget -O EssentialsXSpawn.jar https://github.com/EssentialsX/Essentials/releases/latest/download/EssentialsXSpawn-2.20.1.jar

# LuckPerms (Permissions)
wget -O LuckPerms.jar https://download.luckperms.net/1528/bukkit/LuckPerms-Bukkit-5.4.116.jar

# Vault (Economy API)
wget -O Vault.jar https://github.com/MilkBowl/Vault/releases/download/1.7.3/Vault.jar

# WorldEdit & WorldGuard
wget -O WorldEdit.jar https://dev.bukkit.org/projects/worldedit/files/latest
wget -O WorldGuard.jar https://dev.bukkit.org/projects/worldguard/files/latest

# CoreProtect
wget -O CoreProtect.jar https://github.com/PlayPro/CoreProtect/releases/latest/download/CoreProtect-22.4.jar

# TAB (No scoreboard, just TAB and gray hex colors)
wget -O TAB.jar https://github.com/NEZNAMY/TAB/releases/latest/download/TAB.v4.0.5.jar

# ClearLag
wget -O ClearLag.jar https://dev.bukkit.org/projects/clearlagg/files/latest

# GriefPrevention
wget -O GriefPrevention.jar https://github.com/TechFortress/GriefPrevention/releases/latest/download/GriefPrevention.jar

# PlaceholderAPI
wget -O PlaceholderAPI.jar https://github.com/PlaceholderAPI/PlaceholderAPI/releases/latest/download/PlaceholderAPI-2.11.5.jar

# ProtocolLib
wget -O ProtocolLib.jar https://github.com/dmulloy2/ProtocolLib/releases/latest/download/ProtocolLib.jar

echo "Plugins downloaded successfully!"
echo "Run start.sh to start the server."
