<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_articles_news
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
use Joomla\CMS\Categories\Categories;

$suffix = $moduleclass_sfx;
$heading_tag = $params->get('item_heading', 'h4');
$categoryNodes = Categories::getInstance("content")->get($params->get('catid')[0]);

defined('_JEXEC') or die;
?>

<div class="companies">
  <div class="companies__header">
    <h2 class="companies__title"><?= $module->title; ?></h2>
    <div class="companies__show-all">
      <a href="/<?=$categoryNodes->path?>" class="arrow-button">
        <svg class="arrow-button__icon">
          <use xlink:href="#arrow-right-triangle" />
        </svg>
        <span class="arrow-button__label">Все <?=$categoryNodes->title?></span>
      </a>
    </div>
  </div>
  <div class="companies__list">
    <?php foreach ($list as $item) : ?>
      <a href="<?= $item->link; ?>" class="companies__link">
        <?php if ($params->get('img_intro_full') !== 'none' && !empty($item->imageSrc)) : ?>	
          <figure class="companies__picture">
            <img class="companies__image" src="<?= $item->imageSrc; ?>" alt="<?= $item->title; ?>">
          </figure>
        <?php endif; ?>
        <span class="companies__description"><?= $item->introtext; ?></span>
      </a>
    <?php endforeach; ?>
  </div>
</div>
