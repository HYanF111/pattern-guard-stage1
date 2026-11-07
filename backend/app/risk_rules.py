"""
纹有界 · 第一版知识产权风险规则库

说明：
1. 本模块仅提供初步风险辅助筛查。
2. 不直接判断是否侵权或是否可以商用。
3. 具体权利状态仍需结合素材授权文件、创作过程和在先权利检索确认。
"""

from app.pattern_rules import get_pattern_risk_tips
def analyze_risk(form: dict, pattern_name: str | None = None) -> dict:
    """
    根据用户填写的四项信息进行初步风险分析。

    form 需要包含：
    era、source、modification、usage
    """

    risk_score = 0
    reasons = []
    suggestions = []
    pattern_tips = get_pattern_risk_tips(pattern_name)

    # 规则一：原始创作年代
    era = form.get("era", "")

    if era == "古代/传统传承":
        reasons.append(
            "用户选择的纹样属于古代或传统传承题材。"
            "传统纹样母体通常已进入公有领域，但仍需区分具体数字图片及再创作成果的权利状态。"
        )

    elif era == "近现代/当代有明确作者":
        risk_score += 3
        reasons.append(
            "该纹样可能存在明确的近现代或当代创作者，"
            "需要进一步核实作者身份、著作权归属及保护期限。"
        )
        suggestions.append(
            "核实原始创作者、作品发表时间及相关授权情况，未经确认不要直接用于商业产品。"
        )

    else:
        risk_score += 2
        reasons.append(
            "原始创作年代尚不明确，暂时无法确认纹样是否已经进入公有领域。"
        )
        suggestions.append(
            "进一步查找纹样的历史来源、创作者和相关权利资料。"
        )

    # 规则二：图片或文件来源
    source = form.get("source", "")

    if source == "自己实地拍摄":
        reasons.append(
            "图片由用户自行实地拍摄，但仍需确认被拍摄对象及拍摄场景是否存在其他权利或使用限制。"
        )
        suggestions.append("保存原始照片、拍摄时间和创作过程记录。")

    elif source == "博物馆官方开放下载":
        risk_score += 1
        reasons.append(
            "图片来自博物馆官方开放下载渠道，但开放下载不一定等于允许商业使用，需核对具体授权范围。"
        )
        suggestions.append(
            "查看图片对应的授权说明，确认是否允许商业使用、修改及再传播，保存授权凭证。"
        )

    elif source == "博物馆官方渠道但未标开放授权":
        risk_score += 3
        reasons.append(
            "图片来自博物馆官方渠道，但没有明确开放授权说明。"
            "数字化图片可能具有独立的权利或受到网站使用条款限制。"
        )
        suggestions.append(
            "联系相关博物馆或素材权利人，确认商业使用条件，必要时取得书面授权。"
        )

    elif source == "第三方平台/来源不明":
        risk_score += 3
        reasons.append(
            "图片来自第三方平台或来源不明，目前无法确认图片的原始权利人和授权情况。"
        )
        suggestions.append(
            "追溯图片原始出处，核实著作权归属和授权链条；无法核实前避免商业使用。"
        )

    # 规则三：纹样改动程度
    modification = form.get("modification", "")

    if modification == "原样或仅微调":
        risk_score += 2
        reasons.append(
            "当前设计为原样使用或仅作微调，尚不能体现出充分的个性化创作贡献，"
            "同时可能涉及原始图片或已有设计成果的权利。"
        )
        suggestions.append(
            "避免直接复制他人已有设计，尝试在构图、造型、线条和配色等方面进行独立创作。"
        )

    elif modification == "结构性再创作":
        reasons.append(
            "用户选择了结构性再创作，具有进一步形成独创性表达的可能，"
            "但仍需结合实际设计成果和创作过程判断。"
        )
        suggestions.append(
            "保留设计草图、修改记录和创作过程，明确区分传统纹样元素与个人原创表达。"
        )

    # 规则四：计划使用场景
    usage = form.get("usage", "")

    if usage == "小批量文创/个人作品":
        reasons.append(
            "计划用于小批量文创或个人作品，仍需关注素材授权和第三方在先权利。"
        )

    elif usage == "大规模商业产品":
        risk_score += 2
        reasons.append(
            "计划用于大规模商业产品，商业化使用可能涉及更广泛的授权、著作权及在先权利风险。"
        )
        suggestions.append(
            "正式生产前开展素材授权核查、著作权检索和相关商标检索。"
        )

    elif usage == "品牌联名/广告宣传":
        risk_score += 3
        reasons.append(
            "计划用于品牌联名或广告宣传，除素材权利外，还需关注商标、商业标识、品牌授权及商业混淆风险。"
        )
        suggestions.append(
            "核实合作品牌授权范围，避免使用可能使消费者误认为获得博物馆或其他机构官方授权的宣传表述。"
        )

    # 规则五：计算初步风险等级
    if risk_score >= 7:
        risk_level = "风险较高"
    elif risk_score >= 3:
        risk_level = "需进一步确认"
    else:
        risk_level = "风险较低"

    # 规则六：生成通用提示
    if not suggestions:
        suggestions.append(
            "继续核实素材来源及相关权利状态，保存原始素材和创作过程记录。"
        )

    suggestions.append(
        "商业使用前建议开展相关图片、作品及商标的在先权利检索。"
    )

    return {
        "risk_level": risk_level,
        "risk_score": risk_score,
         "pattern_tips": pattern_tips,
        "reasons": reasons,
        "suggestions": list(dict.fromkeys(suggestions)),
        "disclaimer": (
            "本报告仅依据用户提交的信息进行初步风险辅助筛查，"
            "不构成正式法律意见，不代表侵权认定或商业使用许可。"
            "具体结论应结合素材权属、授权文件、实际设计成果及相关法律规定综合判断。"
        )
    }


# 本地测试代码：只有直接运行本文件时才会执行
if __name__ == "__main__":
    test_form = {
        "era": "古代/传统传承",
        "source": "博物馆官方渠道但未标开放授权",
        "modification": "原样或仅微调",
        "usage": "大规模商业产品",
    }

    result = analyze_risk(test_form)

    print(result)
